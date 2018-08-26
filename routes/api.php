<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware('auth:web')->post('/media-upload', function (Request $request) {
//     $ffmpeg = FFMpeg\FFMpeg::create(array(
//         'timeout'          => 36000,
//     ));
//     $video = $ffmpeg->open($request->file('uploaded-media-file'));

//     $audio_format = new FFMpeg\Format\Audio\Mp3();

//     // Extract the audio into a new file as mp3
//     $video->save($audio_format, 'audio.mp3');
//     // return $request->file('uploaded-media-file')->storeAs('media-files','abc.mp3', 's3');
//     return [];

// });


// Route::get('/media/{fileName}', function (Request $request, $fileName) {
//     return $fileName;
//     $headers = [
//         'Content-Type'        => 'audio/mp3'
//     ];

//     return \Response::make(Storage::disk('s3')->get('media-files/'.$fileName), 200, $headers);
//     // return response()->file(Storage::disk('s3')->get('media-files/abc.mp3'));
// });


