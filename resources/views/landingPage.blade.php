@extends('layouts.app')

@section('content')
    <nav class="navbar navbar-default navbar-fixed-top probootstrap-navbar">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="index.html" title="uiCookies:FineOak">FineOak</a>
        </div>

        <div id="navbar-collapse" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="/waveform/upload">Create Waveform</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <section class="flexslider">
      <ul class="slides">
        <li style="background-image: url(img/slider_1.jpg)" class="overlay">
          <div class="container">
            <div class="row">
              <div class="col-md-11 col-md-offset-1">
                <div class="probootstrap-slider-text text-center">
                  <h1 class="probootstrap-heading probootstrap-animate">Turn Your Sound Into a Piece of Art!</h1>
                  <h1 class="probootstrap-heading probootstrap-animate">From $30. Free Shipping*</h1>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li style="background-image: url(img/slider_2.jpg)" class="overlay">
          <div class="container">
            <div class="row">
              <div class="col-md-11 col-md-offset-1">
                <div class="probootstrap-slider-text text-center">
                  <h1 class="probootstrap-heading probootstrap-animate">Would you like to have a picture of your favorite music? Now, it is possible.</h1>
                  <h1 class="probootstrap-heading probootstrap-animate">We paint your sound</h1>
                </div>
              </div>
            </div>
          </div>

        </li>
        <li style="background-image: url(img/slider_3.jpg)" class="overlay">
          <div class="container">
            <div class="row">
              <div class="col-md-11 col-md-offset-1">
                <div class="probootstrap-slider-text text-center">
                  <h1 class="probootstrap-heading probootstrap-animate">Did you know your voice generates its own distinctive pattern, just as a fingerprint?</h1>
                  <h1 class="probootstrap-heading probootstrap-animate">What about having a picture of it on your wall?</h1>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <section class="probootstrap-section probootstrap-bg-white ">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 section-heading text-center probootstrap-animate">
            <h2>Portfolio</h2>
          </div>
        </div>
      </div>
      <div class="owl-carousel owl-work probootstrap-animate">
        <div class="item">
          <a href="portfolio-single.html">
            <img src="img/work_1.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="img/work_2.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="img/work_3.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="img/work_4.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="img/work_5.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="img/work_6.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="img/work_7.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
      </div>
    </section>

    <section class="probootstrap-section proboostrap-clients probootstrap-bg-white probootstrap-zindex-above-showcase">
      <div class="container">

        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center section-heading probootstrap-animate">
            <h2>Partners</h2>
          </div>
        </div>
        <!-- END row -->
        <div class="row">
          <div class="col-md-3 col-sm-6 col-xs-6 text-center client-logo probootstrap-animate">
            <img src="img/client_1.png" class="img-responsive" alt="Free Bootstrap Template by uicookies.com">
          </div>
          <div class="col-md-3 col-sm-6 col-xs-6 text-center client-logo probootstrap-animate">
            <img src="img/client_2.png" class="img-responsive" alt="Free Bootstrap Template by uicookies.com">
          </div>
          <div class="clearfix visible-sm-block visible-xs-block"></div>
          <div class="col-md-3 col-sm-6 col-xs-6 text-center client-logo probootstrap-animate">
            <img src="img/client_3.png" class="img-responsive" alt="Free Bootstrap Template by uicookies.com">
          </div>
          <div class="col-md-3 col-sm-6 col-xs-6 text-center client-logo probootstrap-animate">
            <img src="img/client_4.png" class="img-responsive" alt="Free Bootstrap Template by uicookies.com">
          </div>

        </div>
      </div>
    </section>
    <section class="textslider-section">
        <div class="textslider-container">
            <h2>What about hanging your</h2>
            <div class="text-vertical-slider">
                <h3>1. Wedding Vow</h3>
                <h3>2. baby's first word</h3>
                <h3>3. favorite song</h3>
                <h3>4. most meaningful  two Yesssss</h3>
                <h3>5. Baby's heartbeat</h3>
            </div>
            <h2>on your wall?</h2>
        </div>
    </section>
    <section class="probootstrap-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center section-heading probootstrap-animate">
            <h2>Why to have a Sound Wave Pic?</h2>
            <p class="lead">Everyone has a sound that is special to them. It could be a song, first word of your baby, wedding vow or your best song. Isn't it so excited to bring it into life as a picture to hang on your wall that lasts for generations?</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="service left-icon probootstrap-animate">
              <div class="icon"><i class="icon-mobile3"></i></div>
              <div class="text">
                <h3>Authentic</h3>
                <p>It is revolutionery compared to traditional gifts. It will bring an great aura in your home.</p>
              </div>
            </div>
            <div class="service left-icon probootstrap-animate">
              <div class="icon"><i class="icon-circle-compass"></i></div>
              <div class="text">
                <h3>Remarkable</h3>
                <p>Hanging  a picture on your wall that is meaningful to you is much better to have rather than some random photo.</p>
              </div>
            </div>
             <div class="service left-icon probootstrap-animate">
              <div class="icon"><i class="icon-lightbulb"></i></div>
              <div class="text">
                <h3>Customizable</h3>
                <p>You have the tools to design your own sound wave as the way you want it to be. You could apply the colors of your living room to fit nicely.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">

            <div class="service left-icon probootstrap-animate">
              <div class="icon"><i class="icon-magnifying-glass2"></i></div>
              <div class="text">
                <h3>Accessible</h3>
                <p>The video/audio is accessible by anyone when QR code is scanned</p>
              </div>
            </div>

            <div class="service left-icon probootstrap-animate">
              <div class="icon"><i class="icon-browser2"></i></div>
              <div class="text">
                <h3>Romantic</h3>
                <p>A romantic way to express yourself. You can have the sound wave of your wedding vow, marriage proposal or dance music.</p>
              </div>
            </div>

            <div class="service left-icon probootstrap-animate">
              <div class="icon"><i class="icon-presentation"></i></div>
              <div class="text">
                <h3>Convenient Shipment</h3>
                <p>We have many contracted print shops in US and EU. We apply very small shipping cost for your convenience.</p>
              </div>
            </div>

          </div>
        </div>
        <!-- END row -->
      </div>
    </section>

    <footer class="probootstrap-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
              <ul class="probootstrap-footer-social">
                <li><a href="#"><i class="icon-twitter"></i></a></li>
                <li><a href="#"><i class="icon-facebook"></i></a></li>
                <li><a href="#"><i class="icon-github"></i></a></li>
                <li><a href="#"><i class="icon-dribbble"></i></a></li>
                <li><a href="#"><i class="icon-linkedin"></i></a></li>
                <li><a href="#"><i class="icon-youtube"></i></a></li>
              </ul>
          </div>
        </div>
        <!-- END row -->
        <div class="row">
          <div class="col-md-12 copyright text-center">
            <p>&copy; 2017 <a href="https://uicookies.com/">uiCookies:FineOak</a>. All Rights Reserved. <br> Designed &amp; Developed with <i class="icon icon-heart"></i> by <a href="https://uicookies.com/">uicookies.com</a></p>
          </div>
        </div>
      </div>
    </footer>
@endsection

