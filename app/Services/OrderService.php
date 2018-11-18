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
        $newWaveformStyle = $mediaFileData->currentWaveformStyle->replicate();
        $waveformId = uniqid($mediaFileData->media_file_id);
        $newWaveformStyle->waveform_id = $waveformId;
        $waveformQrCodeDetails = $newWaveformStyle->waveform_qr_code;
        $waveformQrCodeDetails['qr_code_value']= env('APP_URL').'/waveform/play-media/'.$waveformId;
        $newWaveformStyle->waveform_qr_code = $waveformQrCodeDetails;
        $newWaveformStyle->save();

        $mediaFileData->currentWaveformStyle->state = 'CART';
        $mediaFileData->currentWaveformStyle->save();

        $sizeDetails = PricingList::find($cartData['priceOptions']['size_option']);

        $generatedImageFileName = uniqid($user->id).'.svg';

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
            "size" => $sizeDetails->size,
            "price" => $sizeDetails->price,
            "print_type" => $sizeDetails->print_type,
            "additional_item" => $sizeDetails->additional_item,
            "width" => $sizeDetails->width,
            "height" => $sizeDetails->height,
            "us_canada_gb_shipping_charges" => $sizeDetails->us_canada_gb_shipping_charges,
            "eu_shipping_charges" => $sizeDetails->eu_shipping_charges,
            "other_shipping_charges" => $sizeDetails->other_shipping_charges,
            "qr_code_charge" => $sizeDetails->qr_code_charge,
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
                $carthavingImage = Cart::where('generated_image_url', $lineItem->generated_image_url)->get();
                if(count($carthavingImage) === 0) {
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
                "size" => $cartItem->size,
                "price" => $cartItem->price,
                "print_type" => $cartItem->print_type,
                "additional_item" => $cartItem->additional_item,
                "width" => $cartItem->width,
                "height" => $cartItem->height,
                "us_canada_gb_shipping_charges" => $cartItem->us_canada_gb_shipping_charges,
                "eu_shipping_charges" => $cartItem->eu_shipping_charges,
                "other_shipping_charges" => $cartItem->other_shipping_charges,
                "qr_code_charge" => $cartItem->qr_code_charge,
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
                "country" => $addressDetails['country'],
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
            "country" => $addressDetails['country'],
        ]);

    }
}

// canvas.toDataURL("image/png");
