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
    public function getPNG(Request $request)
    {

        $generatedImageUrl = '15bf41cedca4a3.svg';
        // $image = new \Imagick('http://127.0.0.1:8000/generated-images/15bf2c81a75644.svg');
        Storage::disk('local')->put(
            'original_image_files/'.$generatedImageUrl,
            Storage::disk('s3')->get('resources/generated-images/'.$generatedImageUrl)
        );
        $image = new Imagick();
        $image->readImageBlob(file_get_contents(storage_path('app').'/original_image_files/'.$generatedImageUrl));
        $image->setImageFormat("png24");
        $image->resizeImage(720, 445, Imagick::FILTER_LANCZOS, 1);  /*Optional, if you need to resize*/
        $image->writeImage(storage_path('app').'/converted_image_files/converted.png');

        return [
            'sda' => 'asd'
        ];

    }

    public function getGeneratedImage(Request $request, $generatedImageUrl) {
        $imageData = Storage::disk('s3')->get('resources/generated-images/'.$generatedImageUrl);
        return response($imageData)->header('Content-Type', 'image/svg+xml');
    }
}
