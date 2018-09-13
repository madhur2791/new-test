<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MediaFile extends Model
{
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function currentWaveformStyle()
    {
        return $this->hasOne('App\WaveformStyle');
    }
}
