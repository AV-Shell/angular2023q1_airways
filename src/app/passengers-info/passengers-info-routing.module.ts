import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengersInfoComponent } from './passengers-info.component';

const routes: Routes = [{ path: '', component: PassengersInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassengersInfoRoutingModule {}
