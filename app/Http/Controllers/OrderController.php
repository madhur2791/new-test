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
        $cartItems = Cart::where('user_id', $userId)->get();
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
        $address = OrderAddress::where('order_id', $orderId)->first();
        return view('address', ['orderId' => $orderId, 'address' => $address]);
    }

    public function showPaymentPage(Request $request, $orderId) {
        $order = Order::where('id', $orderId)->with('lineItems')->with('address')->first();
        return view('payment', ['order' => $order]);
    }

    public function addAddressToOrder(Request $request, $orderId) {
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
            'country' => 'required|max:255'
        ]);
        $this->orderService->addAddressToOrder($request->all(), $orderId);
        return redirect()->action(
            'OrderController@showPaymentPage', ['orderId' => $orderId]
        );
    }

    public function showPaymentConfirmationPage(Request $request, $orderId) {
        $order = Order::where('id', $orderId)->with('lineItems')->with('address')->first();
        if($order->payment_status === 'PAID') {
            return view('payment_success', ['order' => $order]);
        }
        return redirect()->action(
            'OrderController@showCart', []
        );
    }

    public function confirmPayment(Request $request, $orderId) {
        Order::where("id", $orderId)->update([
            'payment_status' => 'PAID'
        ]);
        Cart::where('user_id', $request->user()->id)->delete();
        return redirect()->action(
            'OrderController@showPaymentConfirmationPage', ['orderId' => $orderId]
        );
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
        if ($waveform->mediaFile->user_id !== $request->user()->id) {
            return response()->json([
                "status" => "Unauthorized action.",
                "httpCode" => 403
            ], 403);
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
            'baseUrl' => 'https://s3.us-east-2.amazonaws.com/'.env('SOUNDWAVE_AWS_BUCKET')
        ];
    }

    public function showMyOrdersPage(Request $request) {
        $orders = Order::where('user_id', $request->user()->id)
        ->where('payment_status', 'PAID')
        ->with('lineItems.waveformStyle')->with('address')->get();
        return view('myorders', ['orders' => $orders]);
    }

    public function showOrderDetailPage(Request $request, $orderId) {
        $order = Order::where('user_id', $request->user()->id)
            ->where('id', $orderId)
            ->where('payment_status', 'PAID')
            ->with('lineItems')->with('address')->first();
        return view('order', ['order' => $order]);
    }

}
