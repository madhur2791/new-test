<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $guarded = [];
    protected $casts = [];

    public function pricingList()
    {
        return $this->belongsTo('App\PricingList', 'price_list_id');
    }

    public function waveformStyle()
    {
        return $this->belongsTo('App\WaveformStyle', 'waveform_id');
    }
}
