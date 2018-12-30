@extends('layouts.app')
@section('metadata')
<title>Turn your sound into sound wave picture, a piece of art!</title>
<meta name="description" content="Create a sound wave picture from your sound. You can have a sound wave pic of your wedding vow, favorite song, or any sound you can think of!">
<meta name="keywords" content="SoundWave, Sound Wave Picture, SoundWave Art, Soundviz, Sound wave pic">
<meta property="og:title" content="Create a sound wave picture from your sound." />
<meta property="og:description" content="You can have a sound wave pic of your wedding vow, favorite song, or any sound you can think of!" />
<meta property="og:url" content="https://www.soundwavepic.com" />
<meta property="og:image" content="https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo1.jpg" />
@endsection
@section('content')
    @include('partials.navbar')
    <section class="flexslider">
      <ul class="slides">
        <li style="background-image: url(https://s3.us-east-2.amazonaws.com/soundwave-assets/images/Photo_21.jpg)" class="overlay">
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <div class="probootstrap-slider-text text-center">
                  <h1 class="probootstrap-heading">Contact Us</h1>
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
            @if (Session::has('contact_us_success'))
                <div class="alert alert-success">
                    <ul>
                        <li>{{ Session::get('contact_us_success') }}</li>
                    </ul>
                </div>
            @endif
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
          <div class="col-md-5 probootstrap-animate">
            <form action="/contact" method="post" class="probootstrap-form" enctype='multipart/form-data'>
            @csrf
              <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" class="form-control" id="name" name="full_name">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="email">
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" class="form-control" id="subject" name="subject">
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea cols="30" rows="10" class="form-control" id="message" name="message"></textarea>
              </div>
              <div class="form-group">
                <label for="message">Upload (Max 40MB)</label>
                <input type="file" name="uploaded_media_file" class="form-control-file"/>
              </div>
              <div class="form-group">
                <input type="submit" class="btn btn-primary btn-lg" id="submit" name="submit" value="Submit Form">
              </div>
            </form>
          </div>
          <div class="col-md-6 col-md-push-1 probootstrap-animate">


            <h4>USA</h4>
            <ul class="probootstrap-contact-info">
              <li><i class="icon-pin"></i> <span>1732 First Avenue, #25613 New York NY</span></li>
              <li><i class="icon-email"></i><span>hello@soundwavepic.com</span></li>
              <!--<li><i class="icon-phone"></i><span>+123 456 7890</span></li>-->
            </ul>

          </div>
        </div>
      </div>
    </section>
    @include('partials.footer')
@endsection

