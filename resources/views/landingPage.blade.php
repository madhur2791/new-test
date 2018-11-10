@extends('layouts.app')

@section('content')
    @include('partials.navbar')
    <section class="flexslider">
      <ul class="slides">
        <li style="background-image: url('https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_11.jpg')" class="overlay">
          <div class="container">
            <div class="row">
              <div class="col-md-10 col-md-offset-1">
                <div class="probootstrap-slider-text text-center">
                  <h1 class="probootstrap-heading probootstrap-animate">Turn Your Sound Into a Piece of Art!</h1>
                  <h1 class="probootstrap-heading probootstrap-animate">From $30. Free Shipping*</h1>
                  <a class="btn btn-primary btn-lg" href="/waveform/upload">Get Started</a>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li style="background-image: url('https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_21.jpg')" class="overlay">
          <div class="container">
            <div class="row">
              <div class="col-md-10 col-md-offset-1">
                <div class="probootstrap-slider-text text-center">
                  <h1 class="probootstrap-heading probootstrap-animate">Would you like to have a picture of your favorite music? Now, it is possible.</h1>
                  <h1 class="probootstrap-heading probootstrap-animate">We paint your sound</h1>
                  <a class="btn btn-primary btn-lg" href="/waveform/upload">Get Started</a>
                </div>
              </div>
            </div>
          </div>

        </li>
        <li style="background-image: url('https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_31.jpg')" class="overlay">
          <div class="container">
            <div class="row">
              <div class="col-md-10 col-md-offset-1">
                <div class="probootstrap-slider-text text-center">
                  <h1 class="probootstrap-heading probootstrap-animate">Did you know your voice generates its own distinctive pattern, just as a fingerprint?</h1>
                  <h1 class="probootstrap-heading probootstrap-animate">What about having a picture of it on your wall?</h1>
                  <a class="btn btn-primary btn-lg" href="/waveform/upload">Get Started</a>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="how-it-works-container">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-3 animated fadeInUp">
                        <div class="icon"></div>
                        <h3>1. Upload or Record</h3>
                        <p>Upload your audio/video or record it online. You'll be able to edit or cut it online once uploaded.</p>
                    </div>
                    <div class="col-md-3 animated fadeInUp">
                        <div class="icon"></div>
                        <h3>2. Style and Design</h3>
                        <p>Customize your soundwave's shape and color along with the option to add a text and a QR code.</p>
                    </div>
                    <div class="col-md-3 animated fadeInUp">
                        <div class="icon"></div>
                        <h3>3. Print or Download</h3>
                        <p>You can have it printed on a fine art paper or canvas. Or you have the option to download it as PNG and PDF.</p>
                    </div>
                    <div class="col-md-3 animated fadeInUp">
                        <div class="icon"></div>
                        <h3>4. Scan QR Code</h3>
                        <p>Once you scan the QR Code on the picture, you'll be directed to a custom webpage where your video/audio plays. Nevertheless, you have the option not to have a QR code on your picture.</p>
                    </div>
                </div>
            </div>
        </div>
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
            <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_41.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_51.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_61.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_71.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_81.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_91.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
        <div class="item">
          <a href="portfolio-single.html">
            <img src="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_101.jpg" alt="Free Bootstrap Template by uicookies.com">
          </a>
        </div>
      </div>
    </section>

    <section class="textslider-section">
        <div class="textslider-container">
            <h3>What about hanging your</h2>
            <div class="text-vertical-slider">
                <h3>wedding Vow</h3>
                <h3>baby's first word</h3>
                <h3>favorite song</h3>
                <h3>most meaningful two Yesssss</h3>
                <h3>baby's heartbeat</h3>
            </div>
            <h3>on your wall?</h3>
        </div>
    </section>
    <!--<section class="probootstrap-section waveform-section">
        <div id="waveform-surfer"></div>
    </section>-->
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
      </div>
    </section>
    <section class="probootstrap-section probootstrap-border-top probootstrap-bg-white">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center section-heading probootstrap-animate">
            <h2>Testimonial</h2>
          </div>
        </div>
        <!-- END row -->
        <div class="row">
          <div class="col-md-12 probootstrap-animate">
            <div class="owl-carousel owl-carousel-testimony owl-carousel-fullwidth">
              <div class="item">

                <div class="probootstrap-testimony-wrap text-center">
                  <blockquote class="quote">&ldquo;We uploaded our wedding dance music and turned it into soundwave. We are so pleased with the product and the shipping. We had it shipped to Japan and arrived with no harm. It is the same as I designed online. Great piece to fit in our living room.&rdquo;</blockquote>
                </div>

              </div>
              <div class="item">
                <div class="probootstrap-testimony-wrap text-center">
                  <blockquote class="quote">&ldquo;My experience was great with this company. I loved my product. I got the heartbeats of my baby recorded and uploaded them on your website. The product is awesome. Now, we hanged it on the wall and even our guests can listen to our baby's heartbeats by scanning the QR Code. Not to mention how cool the soundwave itself looks. You will be having a returning customer for sure. Thanks!&rdquo;</blockquote>
                </div>
              </div>
              <div class="item">
                <div class="probootstrap-testimony-wrap text-center">
                  <blockquote class="quote">&ldquo;I was searching internet for a romantic gift for weeks and finally discovered your website. I uploaded a short part of our wedding Vow and cut everything but two "Yessssss" es... Now with the final product in my hands, it is everything I was hoping for and can't wait to give it to my wife on Valentine's day!&rdquo;</blockquote>
                </div>
              </div>
              <div class="item">
                <div class="probootstrap-testimony-wrap text-center">
                  <blockquote class="quote">&ldquo;My wife loved this! I got the sound wave of my marriage proposal and her Yesssss yell. Every single friend of her scanned the QR to watch the proposal on your website. I recommend it to anyone.&rdquo;</blockquote>
                </div>
              </div>
              <!--<div class="item">
                <div class="probootstrap-testimony-wrap text-center">
                  <blockquote class="quote">&ldquo;The product brought an amazing aura in our living room.  You guys went above and beyond my expectations.&rdquo;</blockquote>
                </div>
              </div>
              <div class="item">
                <div class="probootstrap-testimony-wrap text-center">
                  <blockquote class="quote">&ldquo;This has been the best purchasing experience of a customized gift I have ever had!&rdquo;</blockquote>
                </div>
              </div>
              <div class="item">
                <div class="probootstrap-testimony-wrap text-center">
                  <blockquote class="quote">&ldquo;The ease and comfort of being able to see/make changes to the design is great!&rdquo;</blockquote>
                </div>
              </div>-->
            </div>
          </div>
        </div>
        <!-- END row -->
      </div>
    </section>
    <section class='try-for-free-section'>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <a class="btn btn-primary btn-lg" href="/waveform/upload">Try It For Free</a>
                </div>
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
    @include('partials.footer')
@endsection

