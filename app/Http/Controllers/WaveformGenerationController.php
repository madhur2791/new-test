<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\MediaFile;
use App\ColorPallet;

class WaveformGenerationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function createWaveform()
    {
        return view('waveform');
    }

    public function getWaveformData(Request $request, $mediaId) {
        $mediaFileObject = MediaFile::where('media_id', $mediaId)->first();
        $jsonData = Storage::disk('s3')->get($mediaFileObject->waveform_raw_data_url);
        return response()->json(json_decode($jsonData));
    }

    public function getColorPallets(Request $request) {
        $colorPallets = ColorPallet::
            where('user_id', null)
            ->orWhere('user_id', $request->user()->id)
            ->orderBy('user_id', 'DESC')
            ->orderBy('created_at', 'DESC')
            ->get();
        return response()->json(json_decode($colorPallets));
    }
}
