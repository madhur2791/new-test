<div class="order-container">
    <?php $total = 0 ?>
    @foreach ($order->lineItems as $lineItem)
        <?php $total += $lineItem->price  ?>
        <div class="row order-line-item-container">
            <div class="col-md-5 text-center">
                <div class="row">
                    <div class="col-md-12">
                        <object class="order-image" type="image/svg+xml" data="/generated-images/{{ $lineItem->generated_image_url }}"></object>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-center">
                        @if ($lineItem->pricingList->print_type === 'Digital')
                        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#downloadModal{{$lineItem->id}}">Download</button>
                        <div id="downloadModal{{$lineItem->id}}" class="modal fade" role="dialog">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title text-left">Download generated wave image</h4>
                                    </div>
                                    <div class="modal-body text-center">
                                        <a class="btn btn-primary" href="/generated-images/svg/{{$lineItem->generated_image_url}}">SVG</a>
                                        <a class="btn btn-primary" href="/generated-images/pdf/{{$lineItem->generated_image_url}}">PDF</a>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endif
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                @if ($lineItem->waveformStyle->waveform_qr_code['enabled'] === true)
                    <a class="play-pause-button" target="_blank" href="{{$lineItem->waveformStyle->waveform_qr_code['qr_code_value']}}"></a>
                @endif
            </div>
            <div class="col-md-2 order-item-description">
                {{ $lineItem->pricingList->print_type }} <br/> {{ $lineItem->pricingList->size }}
            </div>
            <div class="col-md-2 text-right">
                ${{ $lineItem->pricingList->price }}
            </div>
        </div>
    @endforeach
    <div class="row">
            <div class="col-md-6 text-right"></div>
            <div class="col-md-6 text-right">
                QR Code Charge&nbsp;&nbsp; ${{ $order->qrCodeCharge }}
            </div>
            <div class="col-md-6 text-right"></div>
            <div class="col-md-6 text-right">
                Shipping Charges&nbsp;&nbsp; ${{ $order->shippingCharge + $order->additionalShippingCharge }}
            </div>
            <div class="col-md-6 text-right"></div>
            <div class="col-md-6 text-right">
                Total&nbsp;&nbsp; ${{ $order->totalCost }}
            </div>
        </div>
</div>

