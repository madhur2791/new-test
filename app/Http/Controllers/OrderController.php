<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Services\OrderService;
use Illuminate\Support\Facades\Storage;
use App\Services\MediaService;
use Intervention\Image\Facades\Image;
use App\Cart;
use App\Order;
use App\OrderAddress;
use App\OrderLineItem;
use App\WaveformStyle;
use App\ShippingCountry;
use Stripe\Stripe;
use Stripe\Charge;

class OrderController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->orderService = new OrderService();
        $this->mediaService = new MediaService();
    }

    public function getPriceList() {
        return response()->json($this->orderService->getPriceList());
    }

    public function addToCart(Request $request) {
        return response()->json($this->orderService->addToCart($request->user(), $request->input()));
    }

    public function showCart(Request $request) {
        $userId = $request->user()->id;
        $cartItems = Cart::where('user_id', $userId)->with('pricingList', 'waveformStyle')->get();
        $waveformData = WaveformStyle::whereIn('id', $cartItems->pluck('waveform_id'))->with('mediaFile')->get();
        $indexedWaveformData = [];
        foreach ($waveformData as $waveform) {
            $indexedWaveformData[$waveform->id] = $waveform;
        }
        for($i = 0; $i < count($cartItems); $i++) {
            $cartItems[$i]['waveformData'] = $indexedWaveformData[$cartItems[$i]->waveform_id];
        }

        return view('cart', ['cartItems' => $cartItems]);
    }

    public function removeFromCart(Request $request, $cartId) {
        $userId = $request->user()->id;
        $cartItem = Cart::where('id', $cartId)->where('user_id', $userId)->first();
        $orderhavingImage = OrderLineItem::where('generated_image_url', $cartItem->generated_image_url)->get();
        if(count($orderhavingImage) === 0) {
            Storage::disk('s3')->delete('resources/generated-images/'.$cartItem->generated_image_url);
        }
        $cartItem->delete();
        return redirect()->action(
            'OrderController@showCart'
        );
    }

    public function createOrderFromCart(Request $request) {
        $order = $this->orderService->createFromCart($request->user());
        return redirect()->action(
            'OrderController@showAddressPage', ['orderId' => $order->id]
        );
    }

    public function showAddressPage(Request $request, $orderId) {
        $order = Order::where('id', $orderId)->where('user_id', $request->user()->id)->first();
        if (is_null($order)) {
            abort(404);
        }
        $address = OrderAddress::where('order_id', $orderId)->first();
        $countries = ShippingCountry::all();
        return view('address', ['orderId' => $orderId, 'address' => $address, 'countries' => $countries]);
    }

    public function showPaymentPage(Request $request, $orderId, $paymentError = '') {
        $order = Order::where('id', $orderId)->where('user_id', $request->user()->id)->first();
        if (is_null($order)) {
            abort(404);
        }
        $order = $this->orderService->getOrderDetails($orderId);
        return view('payment', ['order' => $order, 'paymentError' => $paymentError]);
    }

    public function addAddressToOrder(Request $request, $orderId) {
        $order = Order::where('id', $orderId)->where('user_id', $request->user()->id)->first();
        if (is_null($order)) {
            abort(404);
        }
        $request->validate([
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|max:255',
            'address_line_1' => 'required|max:512',
            'address_line_2' => 'required|max:512',
            'city' => 'required|max:255',
            'zipcode' => 'required|max:255',
            'state' => 'required|max:255',
            'country_id' => 'required|max:255'
        ]);
        $this->orderService->addAddressToOrder($request->all(), $orderId);
        return redirect()->action(
            'OrderController@showPaymentPage', ['orderId' => $orderId]
        );
    }

    public function showPaymentConfirmationPage(Request $request, $orderId) {
        $order = Order::where('id', $orderId)->where('user_id', $request->user()->id)->first();
        if (is_null($order)) {
            abort(404);
        }
        $order = $this->orderService->getOrderDetails($orderId);
        if($order->payment_status === 'PAID') {
            return view('payment_success', ['order' => $order]);
        }
        return redirect()->action(
            'OrderController@showCart', []
        );
    }

    public function confirmPayment(Request $request, $orderId) {
        $order = Order::where('id', $orderId)->where('user_id', $request->user()->id)->first();
        if (is_null($order)) {
            abort(404);
        }
        $order = $this->orderService->getOrderDetails($orderId);

        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $token = $request->input('stripeToken');

        try {
            $charge = Charge::create([
                'amount' => $order->totalCost * 100,
                'currency' => 'usd',
                'description' => 'Soundwave',
                'source' => $token,
            ]);
            if($charge->status === 'succeeded') {
                Order::where("id", $orderId)->update([
                    'payment_status' => 'PAID'
                ]);
                Cart::where('user_id', $request->user()->id)->delete();
                return redirect()->action(
                    'OrderController@showPaymentConfirmationPage', ['orderId' => $orderId]
                );
            } else {
                return redirect()->action(
                    'OrderController@showPaymentPage', ['orderId' => $orderId, 'paymentError' => 'Payment failed, please try again.']
                );
            }
        } catch(Exception $e) {
            return redirect()->action(
                'OrderController@showPaymentPage', ['orderId' => $orderId, 'paymentError' => $e->getMessage()]
            );
        } catch(\Stripe\Error\Base $e) {
            return redirect()->action(
                'OrderController@showPaymentPage', ['orderId' => $orderId, 'paymentError' => $e->getMessage()]
            );
        }
    }

    public function playMediaFile(Request $request, $waveformId) {
        $waveform = WaveformStyle::where('waveform_id', $waveformId)
            ->with('mediaFile')->first();
        if(is_null($waveform)) {
            return response()->json([
                "status" => "Page Not Found",
                "httpCode" => 404
            ], 404);
        }

        $orderLineItem = OrderLineItem::where('waveform_id', $waveform->id)
            ->with('order')->first();
        if(is_null($orderLineItem)) {
            return response()->json([
                "status" => "Page Not Found",
                "httpCode" => 404
            ], 404);
        }

        if($orderLineItem->order->payment_status !== 'PAID') {
             return response()->json([
                "status" => "Page Not Found",
                "httpCode" => 404
            ], 404);
        }

        if(
            array_key_exists('qrCodeProtectionEnabled', $waveform->waveform_qr_code) &&
            $waveform->waveform_qr_code['qrCodeProtectionEnabled'] === true &&
            array_key_exists('qrCodeSecurityPassword', $waveform->waveform_qr_code) &&
            $request->input('password') !== $waveform->waveform_qr_code['qrCodeSecurityPassword']
        ) {
            return response()->json([
                "status" => "Password Required.",
                "httpCode" => 200,
                "statusCode" => 4003
            ]);
        }


        return [
            'waveform' => $waveform,
            'order_line_item' => $orderLineItem,
            'baseUrl' => 'https://s3.us-east-2.amazonaws.com/'.env('SOUNDWAVE_AWS_BUCKET')
        ];
    }

    public function showMyOrdersPage(Request $request) {
        $orders = Order::where('user_id', $request->user()->id)
        ->where('payment_status', 'PAID')
        ->orderBy('id', 'desc')
        ->with('lineItems.waveformStyle')->with('address')->get();
        return view('myorders', ['orders' => $orders->map(function ($order) {
            return $this->orderService->getOrderDetails($order->id);
        })]);
    }

    public function showOrderDetailPage(Request $request, $orderId) {
        $order = Order::where('id', $orderId)->where('user_id', $request->user()->id)->first();
        if (is_null($order) || $order->payment_status !== 'PAID') {
            abort(404);
        }
        $order = $this->orderService->getOrderDetails($orderId);
        return view('order', ['order' => $order]);
    }

    public function showAdminOrdersList(Request $request) {
        if ($request->user()->is_admin !== true) {
            abort(404);
        }
        $orders = Order::where('payment_status', 'PAID')
        ->orderBy('id', 'desc')
        ->with('lineItems.waveformStyle')->with('address')->get();
        return view('myorders', ['orders' => $orders->map(function ($order) {
            return $this->orderService->getOrderDetails($order->id);
        })]);
    }

    public function showAdminOrderDetails(Request $request, $orderId) {
        if ($request->user()->is_admin !== true) {
            abort(404);
        }
        $order = Order::where('id', $orderId)->first();
        if (is_null($order) || $order->payment_status !== 'PAID') {
            abort(404);
        }
        $order = $this->orderService->getOrderDetails($orderId);
        return view('order', ['order' => $order, 'allow_download' => true]);
    }
}
