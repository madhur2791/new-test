@extends('layouts.app')

@section('content')
@include('partials.checkout_header')
<div class="row cartTableCotainer header-footer-clearence side-margins">
    <div class="col-md-8 col-sm-12 col-md-offset-2">
        <h3> Order Confirmation </h3>
        <div> Your order has been successfully placed. </div>
        <div class="row">
            <div class="col-md-8">
                @include('partials.order_detail')
            </div>
        </div>
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
    </div>
</div>
@include('partials.footer')
@endsection

