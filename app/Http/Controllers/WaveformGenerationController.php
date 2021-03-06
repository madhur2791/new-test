<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\MediaFile;
use App\ColorPallet;
use App\WaveformStyle;
use App\Services\MediaService;

class WaveformGenerationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->mediaService = new MediaService();
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

        $filtered = $colorPallets->filter(function ($colorPallet, $key) {
            return !is_null($colorPallet->user_id);
        });

        $colorPalletIds = $filtered->map(function ($colorPallet) {
            return $colorPallet->id;
        })->all();

        $waveformStyles = WaveformStyle::whereIn('waveform_color->color_pallet_id', $colorPalletIds)->get();
        $usedColorPalletIds = $waveformStyles->map(function ($waveformStyle) {
            return $waveformStyle->waveform_color['color_pallet_id'];
        })->values()->all();

        $colorPallets = $colorPallets->map(function ($colorPallet) use ($usedColorPalletIds) {
            $colorPallet->used = false;
            if (array_search($colorPallet->id, $usedColorPalletIds)) {
                $colorPallet->used = true;
            }
            return $colorPallet;
        });

        return response()->json(json_decode($colorPallets));
    }

    public function updateMediaFileStyle(Request $request, $mediaId) {
        $this->mediaService->updateMediaFileStyle($request->user(), $mediaId, $request->all());
        return response()->json(json_encode([]));
    }

    public function storeColorPallet(Request $request) {
        $colorPallet = ColorPallet::
            create([
                "name" => $request->input('name'),
                "colors" => $request->input('colors'),
                "user_id" => $request->user()->id
            ]);

        return response()->json(json_decode($colorPallet));
    }

}
