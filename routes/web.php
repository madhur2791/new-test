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

Route::get('/contact', 'HomeController@contactPage');

Route::post('/contact', 'HomeController@storeContactPageDetails');

Route::get('/logout', 'Auth\LoginController@logout');

Route::get('/gallery', 'HomeController@galleryPage');

Route::get('/terms-and-conditions', 'HomeController@showTAndCPage');

Route::get('/privacy-policy', 'HomeController@showPrivacyPolicyPage');

Route::get('/user/verify/{token}', 'Auth\RegisterController@verifyUser');

Route::post('/media-file-data/{waveformId}', 'OrderController@playMediaFile');

Route::get('/waveform/play-media/{waveformId}', 'WaveformGenerationController@createWaveform')->where('any', '.*');

Route::middleware(['auth'])->group(function () {

    Route::get('/waveform/{any?}', 'WaveformGenerationController@createWaveform')->where('any', '.*');

    Route::prefix('web-api')->group(function () {

        Route::get('/media-files', 'MediaUploadController@getUploadedMediaFiles');

        Route::post('/media-files', 'MediaUploadController@upload');

        Route::get('/media-files/{mediaId}', 'MediaUploadController@getMediaFileData');

        Route::post('/media-files/{mediaId}/crop', 'MediaUploadController@editMediaFile');

        Route::get('/waveform-data/{mediaId}', 'WaveformGenerationController@getWaveformData');

        Route::get('/color-pallets', 'WaveformGenerationController@getColorPallets');

        Route::post('/color-pallets', 'WaveformGenerationController@storeColorPallet');

        Route::post('/{mediaId}/waveform-styles', 'WaveformGenerationController@updateMediaFileStyle');

        Route::get('/price-lists', 'OrderController@getPriceList');

        Route::post('/carts', 'OrderController@addToCart');

    });

    Route::get('/generated-images/pdf/{generatedImageUrl}', 'ImageController@getPDF');

    Route::get('/generated-images/svg/{generatedImageUrl}', 'ImageController@getSVG');

    Route::get('/generated-images/{generatedImageUrl}', 'ImageController@getGeneratedImage');

    Route::get('/carts', 'OrderController@showCart');

    Route::get('/myorders', 'OrderController@showMyOrdersPage');

    Route::get('/orders/{orderId}', 'OrderController@showOrderDetailPage');

    Route::post('/orders', 'OrderController@createOrderFromCart');

    Route::get('/orders/{orderId}/address', 'OrderController@showAddressPage');

    Route::get('/orders/{orderId}/payment', 'OrderController@showPaymentPage');

    Route::post('/orders/{orderId}/address', 'OrderController@addAddressToOrder');

    Route::get('/carts/{cartId}/delete', 'OrderController@removeFromCart');

    Route::post('/orders/{orderId}/confirm_payment', 'OrderController@confirmPayment');

    Route::get('/orders/{orderId}/success', 'OrderController@showPaymentConfirmationPage');
});


