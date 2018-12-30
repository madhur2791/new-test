
@extends('layouts.app')
@section('metadata')
<title>My Orders</title>
<meta name="description" content="Create a sound wave picture from your sound. You can have a sound wave pic of your wedding vow, favorite song, or any sound you can think of!">
<meta name="keywords" content="SoundWave, Sound Wave Picture, SoundWave Art, Soundviz, Sound wave pic">
@endsection
@section('content')
@include('partials.checkout_header')
<div class="container my-orders-container side-margins">
    @foreach ($orders as $order)
    <a href="/orders/{{$order->id}}">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="order-container">
                    <div>#{{ $order->id }}</div>
                    <?php $total = 0 ?>
                    @foreach ($order->lineItems as $lineItem)
                        <?php $total += $lineItem->price  ?>
                        <div class="row">
                            <div class="col-md-6">
                                {{ $lineItem->print_type }} {{ $lineItem->size }}
                            </div>
                            <div class="col-md-6 text-right">
                                {{ $lineItem->price }}
                            </div>
                        </div>
                    @endforeach
                    <div class="row">
                            <div class="col-md-6 text-right"></div>
                            <div class="col-md-6 text-right">
                                Total&nbsp;&nbsp; &euro; {{ $total }}
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </a>
    @endforeach
</div>
@include('partials.footer')
@endsection




