<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();

Route::get('/', function() {

    // dd((new FFMpeg\Format\Audio\Mp3())->getAudioKiloBitrate());
    $tempFileName = '/Users/casa01/Desktop/Files/SampleAudio_0.7mb.mp3';
    $ffprobe = FFMpeg\FFProbe::create();

    $jsonFileName = 'values.json';
    shell_exec('audiowaveform -i '.$tempFileName.' -o '.$jsonFileName.' -z 128 -b 16');
    return $ffprobe
    ->format($tempFileName)
    ->get('sample rate');
});

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/user/verify/{token}', 'Auth\RegisterController@verifyUser');

Route::middleware(['auth'])->group(function () {

    Route::get('/waveform/{any?}', 'WaveformGenerationController@createWaveform')->where('any', '.*');;

    Route::prefix('web-api')->group(function () {
        Route::get('/media-files', 'MediaUploadController@getUploadedMediaFiles');

        Route::post('/media-files', 'MediaUploadController@upload');

        Route::get('/media-files/{mediaId}', 'MediaUploadController@getMediaFileData');

        Route::post('/media-files/{mediaId}/crop', 'MediaUploadController@editMediaFile');

        Route::get('/waveform-data/{mediaId}', 'WaveformGenerationController@getWaveformData');

        Route::get('/color-pallets', 'WaveformGenerationController@getColorPallets');
    });

});


