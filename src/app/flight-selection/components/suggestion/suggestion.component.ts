import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IFlightInfoExt, IFormats } from 'src/app/store/models';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
})
export class SuggestionComponent implements OnInit, OnDestroy {
  @Input() from = false;
  @Input() formats: IFormats | undefined;
  @Input() value: IFlightInfoExt[] | undefined;

  @Output() showEditForm = new EventEmitter();

  initialSlide = 3;

  imageSliderThere = {
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: this.initialSlide,
    infinite: false,
    draggable: false,
    arrows: true,
    dots: false,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    // asNavFor: '.flight-carousel',
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
    // asNavFor: this.sliderClass,
    asNavFor: '.there.thumbs',
  };

  imagesSliderBack = {
    ...this.imageSliderThere,
    asNavFor: '.back.thumbs',
  };

  thumbnailsSlider = {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: this.initialSlide,
    infinite: false,
    draggable: false,
    arrows: false,
    dots: false,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    // asNavFor:`${this.from ? 'from': 'to'} .feedback`,
    prevArrow: '.client-thumbnails .prev-arrow',
    nextArrow: '.client-thumbnails .next-arrow',
  };

  // slideConfig1 = {
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   initialSlide: 3,
  //   infinite: false,
  //   draggable: false,
  //   arrows: true,
  //   dots: false,
  //   centerMode: true,
  //   centerPadding: '0px',
  //   focusOnSelect: true,
  //   // asNavFor: '.flight-carousel',
  //   responsive: [
  //     {
  //       breakpoint: 1000,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //       },
  //     },
  //     {
  //       breakpoint: 767,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 3,
  //       },
  //     },
  //   ],
  // };

  // slideConfig2 = {
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide: 3,
  //   infinite: false,
  //   draggable: false,
  //   arrows: false,
  //   dots: false,
  //   centerMode: true,
  //   centerPadding: '0px',
  //   focusOnSelect: true,
  //   // asNavFor: '.flight-carousel1',
  // };
  slickInit(e: any) {
    console.log('slick initialized', e);
  }

  breakpoint(e: any) {
    console.log('breakpoint', e);
  }

  afterChange(e: any) {
    console.log('afterChange', e);
  }

  beforeChange(e: any) {
    console.log('beforeChange', e);
  }

  // TODO: change to State/
  fromText = 'Warsaw Modlin';
  toText = 'Dublin';

  ngOnInit(): void {
    console.log();
  }

  ngOnDestroy(): void {
    console.log();
  }

  get sliderClass() {
    return `${this.from ? '.back' : '.there'} .thumbs`;
  }
}
