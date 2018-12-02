<div class="order-container">
    <div>
        <a href="/orders/{{ $order->id }}">#{{ $order->id }}</a>
    </div>
    <?php $total = 0 ?>
    @foreach ($order->lineItems as $lineItem)
        <?php $total += $lineItem->price  ?>
        <div class="row order-line-item-container">
            <div class="col-md-3 text-center">
                <img class="order-image" src="/generated-images/{{ $lineItem->generated_image_url }}" />
            </div>
            <div class="col-md-2 order-item-description">
                {{ $lineItem->print_type }} <br/> {{ $lineItem->size }}
            </div>
            <div class="col-md-1">
                @if ($lineItem->waveformStyle->waveform_qr_code['enabled'] === true)
                    <a class="play-pause-button" href="{{$lineItem->waveformStyle->waveform_qr_code['qr_code_value']}}"></a>
                @endif
            </div>
            <div class="col-md-3 text-right">
                @if ($lineItem->print_type === 'Digital')
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
            <div class="col-md-2 text-right">
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

