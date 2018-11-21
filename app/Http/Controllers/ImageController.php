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
    public function getPNG(Request $request, $generatedImageUrl)
    {
        $aspctRatio = 1.5;
        $expectedWidth = $request->input('w');
        $expectedHeight = $request->input('h');
        if(is_null($expectedWidth) || is_null($expectedHeight)) {
            abort(404);
        }
        Storage::disk('local')->put(
            'original_image_files/'.$generatedImageUrl,
            Storage::disk('s3')->get('resources/generated-images/'.$generatedImageUrl)
        );
        $image = new Imagick();
        $image->readImageBlob(file_get_contents(storage_path('app').'/original_image_files/'.$generatedImageUrl));
        $image->setImageFormat("png24");
        $image->resizeImage($expectedWidth, $expectedHeight, Imagick::FILTER_LANCZOS, 1, true);

        $newWidth = $image->getImageWidth();
        $newHeight = $image->getImageHeight();
        $image->setImageBackgroundColor('white');
        dd($newWidth, $newWidth);
        $image->extentImage(
            $expectedWidth,
            $expectedHeight,
            ($expectedWidth - $newWidth) / 2,
            ($expectedHeight - $newHeight) / 2
        );

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
