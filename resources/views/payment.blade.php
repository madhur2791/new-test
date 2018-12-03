@extends('layouts.app')

@section('content')
@include('partials.checkout_header')
<div class="row cartTableCotainer header-footer-clearence">
    <div class="col-md-8 col-sm-12 col-md-offset-2">
        <h3> Order Summary </h3>
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
                @foreach ($order->lineItems as $lineItem)
                    <?php $total += $lineItem->price  ?>
                    <tr>
                        <td>
                            <div class="cartImageContainer">
                                <img class="cartImage" src="/generated-images/{{ $lineItem->generated_image_url }}" />
                            </div>
                            <div class="cartItemDescContainer">
                                {{ $lineItem->print_type }} {{ $lineItem->size }}
                            </div>
                        </td>
                        <td class="priceColumn">{{ $lineItem->price }}</td>
                    </tr>
                @endforeach
                    <tr>
                        <td class="priceColumn">Total</td>
                        <td class="priceColumn">&euro; {{ $total }}</td>
                    </tr>
            </tbody>
        </table>
        <div class="row">
            <div class="col-md-12 col-sm-12 orderAddressSection">
                <h4>Address</h4>
                <div>{{$order->address->first_name}} {{ $order->address->last_name }}</div>
                <div>{{$order->address->address_line_1}} {{ $order->address->address_line_2 }}</div>
                <div>{{$order->address->state}} {{ $order->address->zipcode }}</div>
                <div>{{$order->address->country}}</div>
                <div>Phone: {{$order->address->phone_number}}</div>
                <div>Email: {{$order->address->email}} </div>
            </div>
        </div>
        <div class="checkout-button">
            <form action="/orders/{{ $order->id }}/confirm_payment" method="post">
                @csrf
                <input class="btn btn-primary btn-lg" type="submit" value="Pay"/>
            </form>
        </div>
    </div>
</div>
@include('partials.footer')
@endsection

