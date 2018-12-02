
@extends('layouts.app')

@section('content')
<div class="container my-ordrs-container">
@include('partials.checkout_header')
<div class="row">
    <div class="col-md-8 col-md-offset-2">
        @include('partials.order_detail')
    </div>
</div>

@endsection
</div>

