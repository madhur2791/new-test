<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderAddress extends Model
{
    protected $guarded = [];
    protected $casts = [];

    public function country()
    {
        return $this->belongsTo('App\ShippingCountry', 'country_id');
    }
}
