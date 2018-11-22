<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mpdf\Mpdf;

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

        $mpdf = new Mpdf();
        $mpdf->AddPage('L');
        $size = '';
        if ($expectedWidth < $expectedHeight) {
            $size = 'width='.$expectedWidth;
        } else {
            $size = 'height='.$expectedHeight;
        }

        $mpdf->WriteHTML('<div style="text-align: center; vertical-align: middle"><img '.$size.' src="'.storage_path('app').'/original_image_files/'.$generatedImageUrl.'" /></div>');

        $mpdf->Output('MyPDF.pdf', 'D');
    }

    public function getGeneratedImage(Request $request, $generatedImageUrl) {
        $imageData = Storage::disk('s3')->get('resources/generated-images/'.$generatedImageUrl);
        return response($imageData)->header('Content-Type', 'image/svg+xml');
    }
}
