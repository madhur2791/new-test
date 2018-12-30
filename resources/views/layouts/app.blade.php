<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @yield('metadata')
    <!-- Scripts -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Bellefair" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <link href="{{ mix('css/styles-merged.css') }}" rel="stylesheet">
    <link href="{{ mix('css/template.css') }}" rel="stylesheet">
    <link href="{{ mix('css/static-app.css') }}" rel="stylesheet">

</head>
<body>
    <div id="app">
        <main class="py-4">
            @yield('content')
        </main>
    </div>
    <script src="/compiled/js/scripts.min.js"></script>
    <script src="/compiled/js/custom.min.js"></script>
    @if (env('ENABLE_SSL') === true)
    <script src="{{ secure_asset('js/app.js') }}" defer></script>
    @else
    <script src="{{ asset('js/app.js') }}" defer></script>
    @endif
</body>
</html>
