import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RequestInfoComponent } from './components/request-info/request-info.component';

@NgModule({
  declarations: [RequestInfoComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [RequestInfoComponent],
})
export class SharedModule {}
