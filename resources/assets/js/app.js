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

    var wavesurfer = WaveSurfer.create({
        container: '#waveform-surfer',
        progressColor: '#85C8DD',
        autoCenter: true,
        interact: false,
        normalize: true,
        scrollParent: true,
        loopSelection: true,
        height: 400,
        waveColor: '#85C8DD',
        barWidth: 5,
        barGap: 0
    });
    wavesurfer.load('happy_together.mp3');
    wavesurfer.on('ready', function () {
        wavesurfer.play();
    });
});
