<!DOCTYPE html>
<html>
<head>
<title>Welcome Email</title>
</head>

<body>
<h2>Hi {{$order->user['name']}},</h2>

@if($order->hasPhysicalItems === true && $order->hasDigitalItems === false)
<br/>
Thank you for your order! Please allow us 2-3 business days to process it.
<br/>
It typically takes 7-10 days to arrive after shipment is made. You’ll receive another email once we ship your order.
<br/>
@endif

@if($order->hasPhysicalItems === false && $order->hasDigitalItems === true)
<br/>
Thank you for your order!
<br/>
Please find your digital product(s) attached to this email.
<br/>
@endif

@if($order->hasPhysicalItems === true && $order->hasDigitalItems === true)
<br/>
Thank you for your order!
<br/>
Please find your digital product(s) attached to this email. Your physical product(s) are being processed and will be sent within 3 business days. You’ll receive another email once we ship your order.
<br/>
@endif

<br/>
Please find your order and shipping address below:
<br/>
<table style="border:1px solid #000000; width: 80%">
    <tr style="border:1px solid #000000;">
        <th style="border:1px solid #000000; text-align: left">Item</th>
        <th style="border:1px solid #000000; text-align: center">Price</th>
    </tr>
    @foreach ($order->lineItems as $lineItem)
        <tr style="border:1px solid #000000;">
            <td style="border:1px solid #000000;">{{ $lineItem->pricingList->print_type }} {{ $lineItem->pricingList->size }}</td>
            <td style="border:1px solid #000000; text-align: right">${{ $lineItem->pricingList->price }}</td>
        </tr>
    @endforeach
    <tr style="border:1px solid #000000;">
        <td style="border:1px solid #000000;"><b>QR Code Charge</b></td>
        <td style="border:1px solid #000000; text-align: right"><b>${{ $order->qrCodeCharge }}</b></td>
    </tr>
    <tr style="border:1px solid #000000;">
        <td style="border:1px solid #000000;"><b>Shipping Charges</b></td>
        <td style="border:1px solid #000000; text-align: right"><b>${{ $order->shippingCharge + $order->additionalShippingCharge }}</b></td>
    </tr>
    <tr style="border:1px solid #000000;">
        <td style="border:1px solid #000000;"><b>Total</b></td>
        <td style="border:1px solid #000000; text-align: right"><b>${{ $order->totalCost }}</b></td>
    </tr>
</table>
<br/>
<h4>Shipping Address:</h4>
<div>{{$order->address->first_name}} {{ $order->address->last_name }}</div>
<div>{{$order->address->address_line_1}} {{ $order->address->address_line_2 }}</div>
<div>{{$order->address->city}}</div>
<div>{{$order->address->state}} {{ $order->address->zipcode }}</div>
<div>{{$order->address->country->country_name}}</div>
<div>Phone: {{$order->address->phone_number}}</div>
<div>Email: {{$order->address->email}} </div>
<br/>
We appreciate your business!
<br/>
Sound Wave Picture Team
</body>
</html>
