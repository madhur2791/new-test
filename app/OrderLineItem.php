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
}
