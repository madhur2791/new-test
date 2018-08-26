let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/react/app.js', 'public/js/build.js')
   .js('resources/assets/js/app.js', 'public/js/app.js')
   .sass('resources/assets/sass/app.scss', 'public/css/app.css')
   .sass('resources/assets/vendor/scss/style.scss', 'public/css/template.css')
   .styles([
        'resources/assets/vendor/css/vendor/bootstrap.min.css',
        'resources/assets/vendor/css/vendor/animate.min.css',
        'resources/assets/vendor/css/vendor/default-skin.css'
    ], 'public/css/vendor.css');

