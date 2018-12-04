
@extends('layouts.app')

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


