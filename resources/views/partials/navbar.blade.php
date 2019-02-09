<nav class="navbar navbar-default navbar-fixed-top probootstrap-navbar">
    <div class="container">
    <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/" title="uiCookies:SoundWavePic">SoundWavePic</a>
    </div>

    <div id="navbar-collapse" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
        <li><a href="/waveform/upload">Create Now</a></li>
        @if (Auth::check())
        <li><a href="/myorders">Orders</a></li>
        <li><a href="/carts">Cart</a></li>
        @endif
        <li><a href="/gallery">Gallery</a></li>
        <li><a href="/faq">FAQ</a></li>
        @if (Auth::check())
        <li><a href="/logout">Logout</a></li>
        @else
        <li><a href="/login">Login</a></li>
        @endif
        </ul>
    </div>
    </div>
</nav>
