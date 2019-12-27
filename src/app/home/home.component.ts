import { Component, OnInit } from '@angular/core';

declare const jQuery;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const $mainSlider = jQuery('#main-slider');

    $mainSlider.slick({
      cssEase: 'ease',
      fade: true,  // Cause trouble if used slidesToShow: more than one
      arrows: true,
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: false,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      slide: '.slick-slide', // Cause trouble with responsive settings
    });
  }

}
