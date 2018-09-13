<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ColorPallet extends Model
{
    protected $guarded = [];
    protected $casts = [
        "colors" => 'array'
    ];
}
