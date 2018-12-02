
@extends('layouts.app')

@section('content')
<div class="container my-ordrs-container">
@include('partials.checkout_header')
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
@endsection
</div>

