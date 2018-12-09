<nav class="navbar navbar-default navbar-fixed-top probootstrap-navbar static-nav-bar">
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
                <li><a href="/logout">Logout</a></li>
                @else
                <li><a href="/login">Login</a></li>
                @endif
                <!--<li class="dropdown">
                <a href="#" data-toggle="dropdown" class="dropdown-toggle profile-dropdown">
                    <img class="profile-pic" src="https://pngimage.net/wp-content/uploads/2018/05/default-profile-pic-png-8.png" />
                </a>
                <ul class="dropdown-menu">
                    <li><a href="/myorders">Orders</a></li>
                    <li><a href="/change">Change Password</a></li>
                </ul>
                </li>-->
            </ul>
        </div>
    </div>
</nav>
