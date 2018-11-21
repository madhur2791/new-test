<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Imagick;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getPNG(Request $request, $waveformId)
    {
        $expectedWidth = $request->input('w');
        $expectedHeight = $request->input('h');
        dd($expectedWidth, $expectedHeight);
        $generatedImageUrl = $waveformId.'.svg';
        Storage::disk('local')->put(
            'original_image_files/'.$generatedImageUrl,
            Storage::disk('s3')->get('resources/generated-images/'.$generatedImageUrl)
        );
        $image = new Imagick();
        $image->readImageBlob(file_get_contents(storage_path('app').'/original_image_files/'.$generatedImageUrl));
        $image->setImageFormat("png24");
        $image->resizeImage($expectedWidth, $expectedHeight, Imagick::FILTER_LANCZOS, 1);
        $image->writeImage(storage_path('app').'/converted_image_files/converted.png');
        Storage::disk('local')->delete('/original_image_files/'.$generatedImageUrl);
        return response()
            ->download(storage_path('app').'/converted_image_files/converted.png')
            ->deleteFileAfterSend();
    }

    public function getGeneratedImage(Request $request, $generatedImageUrl) {
        $imageData = Storage::disk('s3')->get('resources/generated-images/'.$generatedImageUrl);
        return response($imageData)->header('Content-Type', 'image/svg+xml');
    }
}
