require('./bootstrap');
import $ from 'jquery';
import 'slick-carousel';
import {Howl, Howler} from 'howler';

$(document).ready(function(){
    $('.text-vertical-slider').slick({
        vertical: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 300,
        prevArrow: false,
        nextArrow: false
    });

    // var sound = new Howl({
    //     src: ['https://s3.us-east-2.amazonaws.com/soundwave-assets/media_files/happy_together.mp3'],
    //     autoplay: true,
    //     volume: 0.5,
    //     onend: function() {
    //         console.log('finished');
    //     },
    //     onload: () => {
    //         console.log('loaded');
    //     }
    // });
});
