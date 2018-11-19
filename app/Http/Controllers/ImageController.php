<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Imagick;

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
        $image = new \Imagick('http://127.0.0.1:8000/generated-images/15bf2c81a75644.svg');

        return [
            'sda' => 'asd'
        ];

    }
}
