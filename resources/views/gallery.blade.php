@extends('layouts.app')
@section('metadata')
<title>The art of sound wave</title>
<meta name="description" content="Create a sound wave picture from any sound. Create your own art now.">
<meta name="keywords" content="Sound wave ideas, soundwave gifts">
<meta property="og:title" content="Create a sound wave picture from your sound." />
<meta property="og:description" content="You can have a sound wave pic of your wedding vow, favorite song, or any sound you can think of!" />
<meta property="og:url" content="https://www.soundwavepic.com" />
<meta property="og:image" content="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo1_v1.jpg" />
@endsection
@section('content')
    @include('partials.navbar')
        <section class="flexslider">
        <ul class="slides">
            <li style="background-image: url(https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo2_v1.jpg)" class="overlay">
            <div class="container">
                <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="probootstrap-slider-text text-center">
                    <h1 class="probootstrap-heading">The Gallery</h1>
                    </div>
                </div>
                </div>
            </div>
            </li>

        </ul>
        </section>
        <section class="probootstrap-section probootstrap-bg-white">
            <div class="container">
                <div class="row">
                <div class="col-md-12">
                    <div class="portfolio-feed three-cols">
                    <div class="grid-sizer"></div>
                    <div class="gutter-sizer"></div>
                    <div class="probootstrap-gallery">
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x666">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo1_v1.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x667">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo2_v1.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x1500">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo3_v1.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x662">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo4.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>

                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x666">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo5_v1.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x667">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo6_v1.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x1500">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo7_v1.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x662">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo8_v1.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>

                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x666">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo9.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x667">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo10_v1.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    @include('partials.footer')
@endsection
