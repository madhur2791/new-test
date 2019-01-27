<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ContactUs;

class HomeController extends Controller
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
    public function index()
    {
        return view('home');
    }

    public function landingPage()
    {
        return view('landingPage');
    }

    public function contactPage()
    {
        return view('contact');
    }

    public function galleryPage()
    {
        return view('gallery');
    }

    public function storeContactPageDetails(Request $request)
    {
        $request->validate([
            'full_name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|max:255',
            'message' => 'required|max:512',
            'uploaded_file' => 'max:40000'
        ]);
        $path = null;
        if(!is_null($request->file('uploaded_media_file'))) {
            $path = $request->file('uploaded_media_file')->store(
                'contact-media-files', 's3'
            );
        }

        ContactUs::create([
            "full_name" => $request->input("full_name"),
            "email" => $request->input("email"),
            "subject" => $request->input("subject"),
            "message" => $request->input("message"),
            "uploaded_file" => $path
        ]);
        $request->session()->flash('contact_us_success', 'Your message has beem successfully submited.');
        return redirect()->action('HomeController@contactPage');
    }

    public function showTAndCPage()
    {
        return view('t_and_c');
    }

    public function showPrivacyPolicyPage()
    {
        return view('privacy_policy');
    }

    public function showCookiePolicyPage()
    {
        return view('cookie-policy');
    }

    public function faqPage()
    {
        return view('faq');
    }
}
