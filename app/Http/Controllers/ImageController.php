<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Mpdf\Mpdf;
use Mpdf\Config\ConfigVariables;
use Mpdf\Config\FontVariables;

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
    public function getPDF(Request $request, $generatedImageUrl)
    {

        $aspctRatio = 1.5;
        // $expectedWidth = $request->input('w');
        // $expectedHeight = $request->input('h');
        // if(is_null($expectedWidth) || is_null($expectedHeight)) {
        //     abort(404);
        // }
        Storage::disk('local')->put(
            'original_image_files/'.$generatedImageUrl,
            Storage::disk('s3')->get('resources/generated-images/'.$generatedImageUrl)
        );
        $defaultConfig = (new ConfigVariables())->getDefaults();
        $fontDirs = $defaultConfig['fontDir'];

        $defaultFontConfig = (new FontVariables())->getDefaults();
        $fontData = $defaultFontConfig['fontdata'];


        $mpdf = new Mpdf([
            'fontDir' => array_merge($fontDirs, [
                __DIR__.'/fonts',
            ]),
            'fontdata' => $fontData + [
                "aguafinascrip" => [
					'R' => "AguafinaScript-Regular.ttf"
				],
                "cormorantupright" => [
                    'R' => "CormorantUpright-Regular.ttf"
                ],
                "farsan" => [
                    'R' => "Farsan-Regular.ttf"
                ],
                "greatvibes" => [
                    'R' => "GreatVibes-Regular.ttf"
                ],
                "labelleaurore" => [
                    'R' => "LaBelleAurore.ttf"
                ],
                "marvel" => [
                    'R' => "Marvel-Regular.ttf"
                ],
                "amaticsc" => [
                    'R' => "AmaticSC-Regular.ttf"
                ],
                "cutivemono" => [
                    'R' => "CutiveMono-Regular.ttf"
                ],
                "frederickathegreat" => [
                    'R' => "FrederickatheGreat-Regular.ttf"
                ],
                "indieflower" => [
                    'R' => "IndieFlower.ttf"
                ],
                "lifesavers" => [
                    'R' => "LifeSavers-Regular.ttf"
                ],
                "monoton" => [
                    'R' => "Monoton-Regular.ttf"
                ],
                "cormorantsc" => [
                    'R' => "CormorantSC-Regular.ttf"
                ],
                "dancingscript" => [
                    'R' => "DancingScript-Regular.ttf"
                ],
                "giveyouglory" => [
                    'R' => "GiveYouGlory.ttf"
                ],
                "kranky" => [
                    'R' => "Kranky-Regular.ttf"
                ],
                "mandali" => [
                    'R' => "Mandali-Regular.ttf"
                ],
                "nanummyeongjo" => [
                    'R' => "NanumMyeongjo-Regular.ttf"
                ],
                "nixieone" => [
                    'R' => "NixieOne-Regular.ttf"
                ],
                "poiretone" => [
                    'R' => "PoiretOne-Regular.ttf"
                ],
                "princesssofia" => [
                    'R' => "PrincessSofia-Regular.ttf"
                ],
                "rougescript" => [
                    'R' => "RougeScript-Regular.ttf"
                ],
                "sail" => [
                    'R' => "Sail-Regular.ttf"
                ],
                "specialelite" => [
                    'R' => "SpecialElite-Regular.ttf"
                ],
                "orbitron" => [
                    'R' => "Orbitron-Regular.ttf"
                ],
                "pompiere" => [
                    'R' => "Pompiere-Regular.ttf"
                ],
                "reeniebeanie" => [
                    'R' => "ReenieBeanie.ttf"
                ],
                "sacramento" => [
                    'R' => "Sacramento-Regular.ttf"
                ],
                "shortstack" => [
                    'R' => "ShortStack-Regular.ttf"
                ],
                "tulpenone" => [
                    'R' => "TulpenOne-Regular.ttf"
                ]
            ],
        ]);

        $mpdf->AddPage('L');

        $mpdf->WriteHTML(file_get_contents(storage_path('app').'/original_image_files/'.$generatedImageUrl));
        Storage::disk('local')->delete('/original_image_files/'.$generatedImageUrl);
        $mpdf->Output('soundWavePic.pdf', 'D');
    }

    public function getSVG(Request $request, $generatedImageUrl)
    {
        $aspctRatio = 1.5;

        Storage::disk('local')->put(
            'original_image_files/'.$generatedImageUrl,
            Storage::disk('s3')->get('resources/generated-images/'.$generatedImageUrl)
        );

        return response()->download(storage_path('app').'/original_image_files/'.$generatedImageUrl, 'soundWavePic.svg')->deleteFileAfterSend(true);
    }

    public function getGeneratedImage(Request $request, $generatedImageUrl) {
        $imageData = Storage::disk('s3')->get('resources/generated-images/'.$generatedImageUrl);
        return response($imageData)->header('Content-Type', 'image/svg+xml');
    }
}
