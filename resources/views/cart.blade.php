@extends('layouts.app')
@section('metadata')
<title>Cart</title>
<meta name="description" content="Create a sound wave picture from your sound. You can have a sound wave pic of your wedding vow, favorite song, or any sound you can think of!">
<meta name="keywords" content="SoundWave, Sound Wave Picture, SoundWave Art, Soundviz, Sound wave pic">
@endsection
@section('content')

@include('partials.checkout_header')
<div class="row cartTableCotainer header-footer-clearence side-margins">
    <div class="col-md-8 col-sm-12 col-md-offset-2">
        <h3> Cart </h3>
        @if(count($cartItems) > 0)
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
                    <?php $total = 0 ?>
                    @foreach ($cartItems as $cartItem)
                        <?php $total += $cartItem->pricingList->price  ?>
                        <tr>
                            <td>
                                <div class="cartImageContainer">
                                    <img class="cartImage" src="/generated-images/{{ $cartItem->generated_image_url }}" />
                                </div>
                                <div class="cartItemDescContainer">
                                    {{ $cartItem->pricingList->print_type }} {{ $cartItem->pricingList->size }}
                                    <br>
                                    <a href="/waveform/{{ $cartItem->waveformData->mediaFile->media_id }}/color">Edit</a> -
                                    <a href="/carts/{{ $cartItem->id }}/delete">Remove</a>
                                </div>
                            </td>
                            <td class="priceColumn">{{ $cartItem->pricingList->price }}</td>
                        </tr>
                    @endforeach
                        <tr>
                            <td class="priceColumn">Total</td>
                            <td class="priceColumn">$ {{ $total }}</td>
                        </tr>
                </tbody>
            </table>

            <div class="checkout-button">
                <form action="/orders" method="post">
                    @csrf
                    <input class="btn btn-primary btn-lg" type="submit" value="Checkout"/>
                </form>
            </div>
           @else
            Your cart is empty
           @endif
    </div>
</div>
@include('partials.footer')
@endsection

