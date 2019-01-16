<?php

namespace App\Services;

use App\PricingList;
use App\Cart;
use App\Order;
use App\OrderLineItem;
use App\OrderAddress;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use DOMDocument;
use App\CountryShippingCharge;
use App\ShippingChargeGroup;

class OrderService
{
    public function __construct() {
        $this->mediaService = new MediaService();
    }

    public function getPriceList()
    {
        $priceLists = [];
        $allPriceList = PricingList::all();

        foreach ($allPriceList as $index => $price) {
            if($price->print_type === 'Canvas') {
                $priceLists['Canvas'][] = $price;
            }
            if($price->print_type === 'Poster') {
                $priceLists['Poster'][] = $price;
            }
            if($price->print_type === 'Digital') {
                $priceLists['Digital'][] = $price;
            }
        }

        return $priceLists;
    }

    public function addToCart($user, $cartData) {
        $mediaFileData = $this->mediaService->getMediaFileData($user, $cartData['mediaId']);
        $generatedImage = $cartData['generatedImage'];

        $start = '<g>';
        $ini = strpos($generatedImage, $start);
        $ini += strlen($start);
        $len = strpos($generatedImage, '</g>', $ini) - $ini;
        $extractedString = substr($generatedImage, $ini, $len);

        $generatedImage = str_replace('<g>'.$extractedString.'</g>', '', $generatedImage);

        $newWaveformStyle = $mediaFileData->currentWaveformStyle->replicate();
        $waveformId = uniqid($mediaFileData->media_file_id);
        $newWaveformStyle->waveform_id = $waveformId;
        $waveformQrCodeDetails = $newWaveformStyle->waveform_qr_code;
        $waveformQrCodeDetails['qr_code_value']= env('APP_URL').'/waveform/play-media/'.$waveformId;
        $newWaveformStyle->waveform_qr_code = $waveformQrCodeDetails;
        $newWaveformStyle->save();

        $mediaFileData->currentWaveformStyle->state = 'CART';
        $mediaFileData->currentWaveformStyle->save();
        $pricingListId = PricingList::find($cartData['priceOptions']['size_option']);

        $generatedImageFileName = uniqid($user->id).'.svg';
        $mediaFileData->is_cropped = true;
        $mediaFileData->save();

        file_put_contents(
            storage_path('app').'/converted_files/'.$generatedImageFileName,
            $generatedImage
        );
        Storage::disk('s3')->putFileAs(
            'resources/generated-images',
            new File(storage_path('app').'/converted_files/'.$generatedImageFileName),
            $generatedImageFileName
        );
        Storage::disk('local')->delete('/converted_files/'.$generatedImageFileName);

        Cart::create([
            "waveform_id" => $mediaFileData->currentWaveformStyle->id,
            "price_list_id" => $pricingListId->id,
            "generated_image_url" => $generatedImageFileName,
            "user_id" => $user->id
        ]);

        return [];
    }

    public function createFromCart($user) {
        $orders = Order::where('user_id', $user->id)
            ->where('payment_status', 'PENDING')
            ->with('lineItems')
            ->with('address')
            ->get();
        $foundOrder = null;
        foreach($orders as $index => $order) {
            foreach($order->lineItems as $lineItem) {
                $cartHavingImage = Cart::where('generated_image_url', $lineItem->generated_image_url)->get();
                if(count($cartHavingImage) === 0) {
                    Storage::disk('s3')->delete('resources/generated-images/'.$lineItem->generated_image_url);
                }
                $lineItem->delete();
            }
            if($index !== count($orders) - 1) {
                if(!is_null($order->address)) {
                    $order->address->delete();
                }
                $order->delete();
            } else {
                $foundOrder = $order;
            }
        }

        $cartItems = Cart::where('user_id', $user->id)->get();
        if(is_null($foundOrder)) {
            $foundOrder = Order::create([
                "user_id" => $user->id,
                "payment_status" => "PENDING"
            ]);
        }

        foreach($cartItems as $cartItem) {
            OrderLineItem::create([
                "waveform_id" => $cartItem->waveform_id,
                "price_list_id" => $cartItem->price_list_id,
                "generated_image_url" => $cartItem->generated_image_url,
                "order_id" => $foundOrder->id
            ]);
        }

        return $foundOrder;
    }

    public function addAddressToOrder($addressDetails, $orderId) {
        $address = OrderAddress::where('order_id', $orderId)->first();
        if(is_null($address)) {
            return OrderAddress::create([
                "order_id" => $orderId,
                "first_name" => $addressDetails['first_name'],
                "last_name" => $addressDetails['last_name'],
                "email" => $addressDetails['email'],
                "phone_number" => $addressDetails['phone_number'],
                "address_line_1" => $addressDetails['address_line_1'],
                "address_line_2" => $addressDetails['address_line_2'],
                "city" => $addressDetails['city'],
                "zipcode" => $addressDetails['zipcode'],
                "state" => $addressDetails['state'],
                "country_id" => $addressDetails['country_id'],
            ]);
        }
        return OrderAddress::where("order_id", $orderId)->update([
            "first_name" => $addressDetails['first_name'],
            "last_name" => $addressDetails['last_name'],
            "email" => $addressDetails['email'],
            "phone_number" => $addressDetails['phone_number'],
            "address_line_1" => $addressDetails['address_line_1'],
            "address_line_2" => $addressDetails['address_line_2'],
            "city" => $addressDetails['city'],
            "zipcode" => $addressDetails['zipcode'],
            "state" => $addressDetails['state'],
            "country_id" => $addressDetails['country_id'],
        ]);

    }

    public function getOrderDetails($orderId) {
        $order = Order::where('id', $orderId)->with(['lineItems', 'lineItems.pricingList'])->with('address')->first();
        $pricingListIds = $order->lineItems->pluck('price_list_id');
        $countryShippingCharge = CountryShippingCharge::where('country_id', $order->address->country_id)->first();
        $shippingCharges = ShippingChargeGroup::where('shipping_charge_group_id', $countryShippingCharge->shipping_charge_group_id)
            ->whereIn('pricing_list_id', $pricingListIds)->get();
        $indexedShippingCharges = [];
        dd($indexedShippingCharges, $pricingListIds, $shippingCharges, $countryShippingCharge->shipping_charge_group_id);
        foreach ($shippingCharges as $shippingCharge) {
            $indexedShippingCharges[$shippingCharge->pricing_list_id] = $shippingCharge;
        }

        $modifiedLineItems = [];

        $maxShippingCharge = 0;
        $selectedShippingLineItemId = null;
        $totalItemCost = 0;

        foreach ($order->lineItems as $orderLineItem) {
            if($maxShippingCharge < $indexedShippingCharges[$orderLineItem->price_list_id]->shipping_charge) {
                $maxShippingCharge = $indexedShippingCharges[$orderLineItem->price_list_id]->shipping_charge;
                $selectedShippingLineItemId = $orderLineItem->id;
            }
            $orderLineItem['shippingCharge'] = $indexedShippingCharges[$orderLineItem->price_list_id];
            array_push($modifiedLineItems, $orderLineItem);
            $totalItemCost += $orderLineItem->pricingList->price;
        }

        $additionalShippingCharge = 0;
        foreach ($order->lineItems as $orderLineItem) {
            if($selectedShippingLineItemId !== $orderLineItem->id) {
                $additionalShippingCharge += $orderLineItem->pricingList->additional_item;
            }
        }

        $order->lineItems = $modifiedLineItems;
        $order->totalItemCost = $totalItemCost;
        $order->shippingCharge = $maxShippingCharge;
        $order->additionalShippingCharge = $additionalShippingCharge;
        $order->totalCost = $totalItemCost + $maxShippingCharge + $additionalShippingCharge;
        return $order;
    }
}

// canvas.toDataURL("image/png");
