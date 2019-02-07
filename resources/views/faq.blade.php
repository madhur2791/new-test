@extends('layouts.app')
@section('metadata')
<title>How can I create a sound wave</title>
<meta name="description" content="You can upload or record your voice on our website where you'll be able to customize and download your soundwave.">
<meta name="keywords" content="Sound wave pic">
<meta property="og:title" content="Create a sound wave picture from your sound." />
<meta property="og:description" content="You can have a sound wave pic of your wedding vow, favorite song, or any sound you can think of!" />
<meta property="og:url" content="https://www.soundwavepic.com" />
<meta property="og:image" content="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo1_v1.jpg" />
@endsection

@section('content')
@include('partials.checkout_header')
<div class="terms-container">
    <h2>FAQ</h2>
    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-1" role="button" aria-expanded="false" aria-controls="acc-1">
        What is a sound wave?
    </a>
    </p>
    <div class="collapse" id="acc-1">
    <div class="card card-body">
        In short, a sound wave is the visual display of a sound.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-2" role="button" aria-expanded="false" aria-controls="acc-2">
        What does SoundWavePic.com do?
    </a>
    </p>
    <div class="collapse" id="acc-2">
    <div class="card card-body">
        First, we extract the sound waves of an audio/video file uploaded on our website. Then we enable users to design awesome soundwaves thanks to our special algorithm where users are free to change colors, form of the waves, add text, etc. Users can also add QR Code to their design so that anyone who scans the QR Code can be redirected to their special webpage to play the uploaded audio/video.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-3" role="button" aria-expanded="false" aria-controls="acc-3">
        Why would I need a sound wave pic?
    </a>
    </p>
    <div class="collapse" id="acc-3">
    <div class="card card-body">
        Did you know that your voice generates its own distinctive pattern, just as a fingerprint? And our algorithm allows you to change your soundwave as much as you want to turn it into a piece of art.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-4" role="button" aria-expanded="false" aria-controls="acc-4">
        What are the mostly used Sound Wave Pic ideas to get inspired?
    </a>
    </p>
    <div class="collapse" id="acc-4">
    <div class="card card-body">
        In most of the orders people turned the following into a Sound Wave Pic:
        <ul>
            <li>Marriage proposals</li>
            <li>Wedding vow</li>
            <li>Their favorite music</li>
            <li>Voice of their baby</li>
            <li>Two Yessssses told on weddings</li>
            <li>“I love you” or “I do”</li>
            <li>Dog barking</li>
            <li>Heartbeat of their baby</li>
        </ul>
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-5" role="button" aria-expanded="false" aria-controls="acc-5">
        Why isn’t my audio/video playing?
    </a>
    </p>
    <div class="collapse" id="acc-5">
    <div class="card card-body">
        The most common reason is DRM (Digital Rights Management) which brings the modification and distribution of a copyrighted item under control. iTunes is one of mostly known DRM user. You cannot play a music bought on iTunes anywhere but iTunes.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-6" role="button" aria-expanded="false" aria-controls="acc-6">
        Where to get music to upload here?
    </a>
    </p>
    <div class="collapse" id="acc-6">
    <div class="card card-body">
        One of the best place to get a DRM free music is Amazon Music Store. You can buy/download from anywhere but please make sure the music file is DRM free. For example, iTunes uses DRM which prevents you to process the music file on our website or anywhere else.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-7" role="button" aria-expanded="false" aria-controls="acc-7">
        What are the accepted file types?
    </a>
    </p>
    <div class="collapse" id="acc-7">
    <div class="card card-body">
        We support almost all the video and audio formats.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-8" role="button" aria-expanded="false" aria-controls="acc-8">
        How do I edit my file?
    </a>
    </p>
    <div class="collapse" id="acc-8">
    <div class="card card-body">
        First, listen to the uploaded file to determine which part you want to remain and drag the left and right pointers to have the desired part in the middle. Click cut button (scissors icon) to cut the audio/video.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-9" role="button" aria-expanded="false" aria-controls="acc-9">
        Why should I add a QR code on my sound wave pic?
    </a>
    </p>
    <div class="collapse" id="acc-9">
    <div class="card card-body">
        By adding a QR Code, you’ll have the chance to listen to the music associated with the sound wave picture whenever you want. Suppose you hung your wedding vow on your living room. You’ll give your guests the chance to scan and see what it is rather than explaining the soundwave.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-10" role="button" aria-expanded="false" aria-controls="acc-10">
        Why would I add a password on QR Code?
    </a>
    </p>
    <div class="collapse" id="acc-10">
    <div class="card card-body">
        Let’s say you have guests that you don’t want give access listening to your wedding vow. Then, add a password on your QR code that will bring a password to play the audio/video file.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-11" role="button" aria-expanded="false" aria-controls="acc-11">
        Can I upload a video file?
    </a>
    </p>
    <div class="collapse" id="acc-11">
    <div class="card card-body">
        Yes, you can. Our system will extract its audio and turn it into soundwave that is ready to be designed.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-12" role="button" aria-expanded="false" aria-controls="acc-12">
        Can I cut a file on your website?
    </a>
    </p>
    <div class="collapse" id="acc-12">
    <div class="card card-body">
        Yes, you can cut your audio/video to have only the desired parts.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-13" role="button" aria-expanded="false" aria-controls="acc-13">
        Why do I see a watermark on the soundwave?
    </a>
    </p>
    <div class="collapse" id="acc-13">
    <div class="card card-body">
        It will be removed once the order has been placed.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-14" role="button" aria-expanded="false" aria-controls="acc-14">
        What are the print sizes? What is the cost?
    </a>
    </p>
    <div class="collapse" id="acc-14">
    <div class="card card-body">
        Digital downloads are resizable and $25. Posters and Canvas are available in the following sizes:
        <table class="table-bordered">
            <tr>
                <th>Canvas</th>
                <th>Price</th>
                <th>Shipping to US & Canada & GB</th>
                <th>Shipping to EU Countries</th>
                <th>Other Countries</th>
                <th>Other Countries	Additional Item</th>
            </tr>

            <tr>
                <td>8"x8"</td>
                <td>80</td>
                <td>0</td>
                <td>0</td>
                <td>10</td>
                <td>0</td>
            </tr>
            <tr>
                <td>8"x12"</td>
                <td>90</td>
                <td>0</td>
                <td>0</td>
                <td>10</td>
                <td>0</td>
            </tr>
            <tr>
                <td>16"x16"</td>
                <td>160</td>
                <td>0</td>
                <td>0</td>
                <td>10</td>
                <td>0</td>
            </tr>
            <tr>
                <td>16"x24"</td>
                <td>180</td>
                <td>0</td>
                <td>0</td>
                <td>20</td>
                <td>0</td>
            </tr>
            <tr>
                <td>20"x30"</td>
                <td>200</td>
                <td>0</td>
                <td>0</td>
                <td>20</td>
                <td>0</td>
            </tr>
            <tr>
                <td>24"x24"</td>
                <td>240</td>
                <td>0</td>
                <td>0</td>
                <td>20</td>
                <td>0</td>
            </tr>
            <tr>
                <td>24"x36"</td>
                <td>300</td>
                <td>0</td>
                <td>0</td>
                <td>30</td>
                <td>0</td>
            </tr>
            <tr>
                <td>40"x40"</td>
                <td>380</td>
                <td>0</td>
                <td>0</td>
                <td>50</td>
                <td>0</td>
            </tr>

            <tr>
                <td>32"x48"</td>
                <td>400</td>
                <td>0</td>
                <td>0</td>
                <td>50</td>
                <td>0</td>
            </tr>
            </table>
            <br>
            <table class="table-bordered">
                <tr>
                    <th>Poster</th>
                    <th>Price</th>
                    <th>Shipping to US & Canada & GB</th>
                    <th>Shipping to EU Countries</th>
                    <th>Other Countries</th>
                    <th>Other Countries	Additional Item</th>
                </tr>

                <tr>
                    <td>11"x17"</td>
                    <td>40</td>
                    <td>0</td>
                    <td>0</td>
                    <td>5</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>18"x24"</td>
                    <td>90</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>24"x36"</td>
                    <td>120</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
            </table>
        Optional QR Code extension is $10.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-15" role="button" aria-expanded="false" aria-controls="acc-15">
        What are the printing types (Digital, Poster, Canvas)?
    </a>
    </p>
    <div class="collapse" id="acc-15">
    <div class="card card-body">
        <p class="accordian-header-container">Digital download is available instantly once your design is ready. Digital downloads are resizable and available in PDF and SVG</p>
        <p class="accordian-header-container">Posters are Fine Art Prints which are digitally printed on premium matted artist-grade custom developed 264 gsm paper with archival, acid-free pigment-based inks, with 300dpi, giving each piece of art an elegant finish. Frame is not included.</p>
        <p class="accordian-header-container">Canvas Wraps are printed on high-quality artist stock, then stretched and wrapped around wood fiberboard. Canvases frames are 1.25” thick and come with hooks for instant hanging.</p>
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-16" role="button" aria-expanded="false" aria-controls="acc-16">
        Where do you ship?
    </a>
    </p>
    <div class="collapse" id="acc-16">
    <div class="card card-body">
        We ship worldwide.
    </div>
    </div>

    <p class="accordian-header-container">
    <a class="accordian-header" data-toggle="collapse" href="#acc-17" role="button" aria-expanded="false" aria-controls="acc-17">
        How long does it take to receive my printing?
    </a>
    </p>
    <div class="collapse" id="acc-17">
    <div class="card card-body">
        It usually takes 2 weeks you to receive your order. Instant download available for Digital downloads.
    </div>
    </div>
</div>


@include('partials.footer')
@endsection


