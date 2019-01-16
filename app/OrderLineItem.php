<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderLineItem extends Model
{
    protected $guarded = [];
    protected $casts = [];

    public function order()
    {
        return $this->belongsTo('App\Order');
    }

    public function waveformStyle()
    {
        return $this->belongsTo('App\WaveformStyle', 'waveform_id');
    }

    public function pricingList()
    {
        return $this->belongsTo('App\PricingList', 'price_list_id');
    }
}
