@extends('layouts.app')

@section('content')
@include('partials.checkout_header')
<div class="row cartTableCotainer header-footer-clearence side-margins">
    <div class="col-md-6 col-sm-10 col-md-offset-3 col-sm-offset-1">
        <h3> Address </h3>
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form action="/orders/{{ $orderId }}/address" method="post" class="probootstrap-form">
            @csrf
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="name">First Name</label>
                        <input type="text" class="form-control" id="name" name="first_name" value="{{!is_null($address) ? $address->first_name : ''}}">
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="name">Last Name</label>
                        <input type="text" class="form-control" id="name" name="last_name" value="{{!is_null($address) ? $address->last_name: ''}}">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" name="email" value="{{!is_null($address) ? $address->email: ''}}">
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="subject">Phone Number</label>
                        <input type="text" class="form-control" id="subject" name="phone_number" value="{{!is_null($address) ? $address->phone_number: ''}}">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="subject">Street</label>
                        <input type="text" class="form-control" id="subject" name="address_line_1" value="{{!is_null($address) ? $address->address_line_1: ''}}">
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="message">Apartment, Suite, Unit</label>
                        <input type="text" class="form-control" id="subject" name="address_line_2" value="{{!is_null($address) ? $address->address_line_2: ''}}">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="message">City</label>
                        <input type="text" class="form-control" id="subject" name="city" value="{{!is_null($address) ? $address->city: ''}}">
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label for="message">Zipcode</label>
                        <input type="text" class="form-control" id="subject" name="zipcode" value="{{!is_null($address) ? $address->zipcode: ''}}">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label for="message">State</label>
                <input type="text" class="form-control" id="subject" name="state" value="{{!is_null($address) ? $address->state: ''}}">
            </div>
            <div class="form-group">
                <label for="message">Country</label>
                <select name="country_id" class="form-control">
                    @foreach ($countries as $country)
                        <option {{!is_null($address) ? $address->country_id === $country->id ? 'selected' : '' : ''}} value="{{$country->id}}">{{$country->country_name}}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary btn-lg" id="submit" name="submit" value="Checkout">
            </div>
        </form>
    </div>
</div>
@include('partials.footer')
@endsection

