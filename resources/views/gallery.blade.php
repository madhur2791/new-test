@extends('layouts.app')

@section('content')
    @include('partials.navbar')
        <section class="flexslider">
        <ul class="slides">
            <li style="background-image: url(https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_31.jpg)" class="overlay">
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
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo1.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x667">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo2.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x1500">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo3.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
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
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo5.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x667">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo6.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x1500">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo7.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
                    </a>
                    <figcaption itemprop="caption description">Image caption here</figcaption>
                    </figure>
                    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="grid-item probootstrap-animate">
                    <a itemprop="contentUrl" data-size="1000x662">
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo8.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
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
                        <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo10.jpg" itemprop="thumbnail" alt="Free Bootstrap Template by uicookies.com" />
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
