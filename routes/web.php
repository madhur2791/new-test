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

Route::get('/', 'HomeController@landingPage');

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

        Route::post('/{mediaId}/waveform-styles', 'WaveformGenerationController@updateMediaFileStyle');
    });

});


