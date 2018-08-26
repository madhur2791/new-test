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

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/user/verify/{token}', 'Auth\RegisterController@verifyUser');

Route::middleware(['auth'])->group(function () {

    Route::get('/create/{any?}', 'WaveformController@createWaveform')->where('any', '.*');;

    Route::prefix('web-api')->group(function () {
        Route::get('/media-files', 'MediaController@getUploadedMediaFiles');
        Route::post('/media-upload', 'MediaController@upload');
        Route::post('/media/{mediaId}/edit', 'MediaController@editMediaFile');
        Route::get('/waveform-data/{mediaId}', 'MediaController@getWaveformData');
    });

});


