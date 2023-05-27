import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { FlightSelectionRoutingModule } from './flight-selection-routing.module';
import { FlightSelectionComponent } from './flight-selection.component';
import { SharedModule } from '../shared/shared.module';
import { SuggestionComponent } from './components/suggestion/suggestion.component';
import { FlightMinInfoComponent } from './components/flight-min-info/flight-min-info.component';
import { FlightFullInfoComponent } from './components/flight-full-info/flight-full-info.component';

@NgModule({
  declarations: [FlightSelectionComponent, SuggestionComponent, FlightMinInfoComponent, FlightFullInfoComponent],
  imports: [CommonModule, FlightSelectionRoutingModule, SharedModule, MatButtonModule],
})
export class FlightSelectionModule {}
