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

mix.react('resources/assets/react/app.js', 'public/js/build.js') // react app
   .js([
        'resources/assets/js/app.js'
    ], 'public/js/app.js')

   .sass('resources/assets/sass/app.scss', 'public/css/app.css') // app styles
   .sass('resources/assets/sass/static-app.scss', 'public/css/static-app.css') // static pages styles
   .sass('resources/assets/vendor/scss/style.scss', 'public/css/template.css') // fineoak styles

   .styles('resources/assets/vendor/css/vendor/bootstrap.min.css', 'public/css/bootstrap.min.css')

   .styles([
       'resources/assets/vendor/css/animate.css',
       'resources/assets/vendor/css/bootstrap.min.css',
       'resources/assets/vendor/css/default-skin.css',
       'resources/assets/vendor/css/flexslider.css',
       'resources/assets/vendor/css/icomoon.css',
       'resources/assets/vendor/css/owl.carousel.min.css',
       'resources/assets/vendor/css/owl.theme.default.min.css',
       'resources/assets/vendor/css/photoswipe.css',
       'resources/assets/vendor/css/slick.css'
   ], 'public/css/styles-merged.css');




