require('./bootstrap');
import $ from 'jquery';
import 'slick-carousel';


$(document).ready(function(){
    $('.text-vertical-slider').slick({
        vertical: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 300
    });
});
