<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WaveformStyle extends Model
{
    protected $guarded = [];
    protected $casts = [
        "images" => 'array',
        "waveform_color" => 'array',
        "waveform_style" => 'array',
        "waveform_qr_code" => 'array',
        "waveform_text" => 'array'
    ];

    public function user()
    {
        return $this->belongsTo('App\MediaFile');
    }
}
