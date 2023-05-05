import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TmpRoutingModule } from './tmp-routing.module';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { Bookingpage1Component } from './pages/bookingpage1/bookingpage1.component';
import { Bookingpage2Component } from './pages/bookingpage2/bookingpage2.component';
import { Bookingpage3Component } from './pages/bookingpage3/bookingpage3.component';
import { ShoppingcartComponent } from './pages/shoppingcart/shoppingcart.component';

@NgModule({
  declarations: [MainpageComponent, Bookingpage1Component, Bookingpage2Component, Bookingpage3Component, ShoppingcartComponent],
  imports: [CommonModule, TmpRoutingModule],
})
export class TmpModule {}
