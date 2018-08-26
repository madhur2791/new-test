<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WaveformController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function createWaveform()
    {
        return view('waveform');
    }

    public function testing()
    {
        return ['sd'];
    }


}
