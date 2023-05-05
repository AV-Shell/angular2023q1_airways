import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { Bookingpage1Component } from './pages/bookingpage1/bookingpage1.component';
import { Bookingpage2Component } from './pages/bookingpage2/bookingpage2.component';
import { Bookingpage3Component } from './pages/bookingpage3/bookingpage3.component';
import { ShoppingcartComponent } from './pages/shoppingcart/shoppingcart.component';

const routes: Routes = [
{ path: 'mainpage', component: MainpageComponent},
{ path: 'bookingpage1', component: Bookingpage1Component},
{ path: 'bookingpage2', component: Bookingpage2Component},
{ path: 'bookingpage3', component: Bookingpage3Component},
{ path: 'shoppingcart', component: ShoppingcartComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TmpRoutingModule { }
