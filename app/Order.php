<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [];
    protected $casts = [];

    public function lineItems()
    {
        return $this->hasMany('App\OrderLineItem');
    }

    public function address()
    {
        return $this->hasOne('App\OrderAddress');
    }
}
