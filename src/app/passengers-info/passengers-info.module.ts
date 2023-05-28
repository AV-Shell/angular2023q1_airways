import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengersInfoRoutingModule } from './passengers-info-routing.module';
import { PassengersInfoComponent } from './passengers-info.component';

@NgModule({
  declarations: [PassengersInfoComponent],
  imports: [CommonModule, PassengersInfoRoutingModule],
})
export class PassengersInfoModule {}
