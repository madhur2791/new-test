@extends('layouts.app')
@section('metadata')
<title>Sound wave pic</title>
<meta name="description" content="Create a sound wave picture from your sound. You can have a sound wave pic of your wedding vow, favorite song, or any sound you can think of!">
<meta name="keywords" content="SoundWave, Sound Wave Picture, SoundWave Art, Soundviz, Sound wave pic">
@endsection
@section('content')
@include('partials.checkout_header')
<div class="row cartTableCotainer header-footer-clearence side-margins">
    <div class="col-md-8 col-sm-12 col-md-offset-2">
        <h3> Order Summary </h3>
        @if (app('request')->input('paymentError'))
            <div class="alert alert-danger">
                <ul>
                    {{app('request')->input('paymentError')}}
                </ul>
            </div>
        @endif
        <table class="table">
            <thead>
                <tr>
                    <th>
                        ITEM DESCRIPTION
                    </th>
                    <th class="priceColumn">
                        PRICE
                    </th>
                </tr>
            <thead>
            <tbody>
                @foreach ($order->lineItems as $lineItem)
                    <tr>
                        <td>
                            <div class="cartImageContainer">
                                <img class="cartImage" src="/generated-images/{{ $lineItem->generated_image_url }}" />
                            </div>
                            <div class="cartItemDescContainer">
                                {{ $lineItem->pricingList->print_type }} {{ $lineItem->pricingList->size }}
                            </div>
                        </td>
                        <td class="priceColumn">{{ $lineItem->pricingList->price }}</td>
                    </tr>
                @endforeach
                    <tr>
                        <td class="priceColumn">Shipping Charge</td>
                        <td class="priceColumn">${{ $order->shippingCharge + $order->additionalShippingCharge }}</td>
                    </tr>
                    <tr>
                        <td class="priceColumn">QR Code Charge</td>
                        <td class="priceColumn">${{ $order->qrCodeCharge }}</td>
                    </tr>

                    <tr>
                        <td class="priceColumn">Total</td>
                        <td class="priceColumn">${{ $order->totalCost }}</td>
                    </tr>
            </tbody>
        </table>
        @if (in_array(Auth::user()->email, ['test@soundwavepic.com']))
        <div class="checkout-button">
            <form action="/orders/{{ $order->id }}/confirm_payment" method="POST">
                @csrf
                <script
                    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
                    data-key="{{env('STRIPE_PUBLIC_KEY')}}"
                    data-amount="{{ $order->totalCost * 100 }}"
                    data-name="Sound Wave Picture"
                    data-description="soundwavepic.com"
                    data-image="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/stripe-sound-icon.png"
                    data-locale="auto">
                </script>
            </form>
        </div>
        @endif
        <div class="row">
            <div class="col-md-12 col-sm-12 orderAddressSection">
                <h4>Address</h4>
                <div>{{$order->address->first_name}} {{ $order->address->last_name }}</div>
                <div>{{$order->address->address_line_1}} {{ $order->address->address_line_2 }}</div>
                <div>{{$order->address->city}}</div>
                <div>{{$order->address->state}} {{ $order->address->zipcode }}</div>
                <div>{{$order->address->country->country_name}}</div>
                <div>Phone: {{$order->address->phone_number}}</div>
                <div>Email: {{$order->address->email}} </div>
            </div>
        </div>
    </div>
</div>
@include('partials.footer')
@endsection

