
@extends('layouts.app')
@section('metadata')
<title>Order</title>
<meta name="description" content="Create a sound wave picture from your sound. You can have a sound wave pic of your wedding vow, favorite song, or any sound you can think of!">
<meta name="keywords" content="SoundWave, Sound Wave Picture, SoundWave Art, Soundviz, Sound wave pic">
@endsection
@section('content')
@include('partials.checkout_header')
<div class="container my-orders-container side-margins">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            @include('partials.order_detail')
        </div>
    </div>
</div>
@include('partials.footer')
@endsection


