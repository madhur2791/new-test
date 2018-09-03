<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WaveformStyle extends Model
{
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\MediaFile');
    }
}
