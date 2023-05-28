import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IAirportsNames } from 'src/app/core/models/core.models';
import { IAppState, IFlightInfoExt, IFlightSearchState, IFormats, ISelectFlightState } from 'src/app/store/models';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFlightSelector } from 'src/app/store/selectors';
import { changeFlightSelectValue } from 'src/app/store/actions';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
})
export class SuggestionComponent implements OnInit, OnDestroy {
  @Input() backWay = false;
  // @Input() selected = true;
  @Input() formats: IFormats | undefined;
  @Input() value: IFlightInfoExt[] | undefined;
  @Input() airports: IAirportsNames = { airportTo: '', airportFrom: '' };

  @Output() showEditForm = new EventEmitter();

  @ViewChild('slickDates') slickDates!: SlickCarouselComponent;
  @ViewChild('slickFlight') slickFlight!: SlickCarouselComponent;

  public unclickable = false;

  private sub!: Subscription;

  public selected = true;
  public selectedIndex = 3;

  public dayInfoSliderThere = {
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: this.selectedIndex,
    infinite: false,
    draggable: false,
    arrows: true,
    dots: false,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
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
    asNavFor: '.thereWay.flightsCarousel',
  };

  public dayInfoSliderBack = {
    ...this.dayInfoSliderThere,
    asNavFor: '.backWay.flightsCarousel',
  };

  public flightInfoSliderThere = {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: this.selectedIndex,
    infinite: false,
    draggable: false,
    arrows: false,
    dots: false,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    prevArrow: '.client-thumbnails .prev-arrow',
    nextArrow: '.client-thumbnails .next-arrow',
    // asNavFor: '.backWay.datasCarousel',
  };

  public flightInfoSliderBack = {
    ...this.flightInfoSliderThere,
    // asNavFor: '.backWay.datasCarousel',
  };

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.sub = this.store.select(selectFlightSelector).subscribe(data => {
      const previousSelected = this.selected;

      this.selected = this.backWay ? !!data.selectedBackWay : !!data.selectedThereWay;
      this.selectedIndex = this.backWay ? data.selectedIndexBackWay : data.selectedIndexThereWay;

      if (previousSelected !== this.selected) {
        this.unclickable = false;
      }

      this.dayInfoSliderThere.initialSlide = this.selectedIndex;
      this.dayInfoSliderBack.initialSlide = this.selectedIndex;
      this.flightInfoSliderThere.initialSlide = this.selectedIndex;
      this.flightInfoSliderBack.initialSlide = this.selectedIndex;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  slickInit(e: any) {
    // console.log('slick initialized', e);
    // console.log('slickInit', 'backWay', this.backWay);
    // this.sliderNavigates();
  }

  breakpoint(e: any) {
    // console.log('breakpoint', e);
  }

  afterChange(e: { currentSlide: number }) {
    // this.unclickable = false;

    if (e.currentSlide !== this.selectedIndex) {
      const t: Partial<ISelectFlightState> = this.backWay
        ? {
            selectedIndexBackWay: e.currentSlide,
          }
        : {
            selectedIndexThereWay: e.currentSlide,
          };
      this.store.dispatch(changeFlightSelectValue({ values: t }));
    }
  }

  beforeChange(e: { currentSlide: number }) {
    // this.unclickable = true;
  }

  sliderNavigates() {
    this.slickDates?.slickGoTo(this.selectedIndex);
    this.slickFlight?.slickGoTo(this.selectedIndex);
  }

  get sliderClass() {
    return `${this.backWay ? '.back' : '.there'} .thumbs`;
  }
}
