import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AirHttpService } from './services/air.http.service';
import { LocalstorageService } from './services/localstorage.service';
import { AirInterceptor } from './interceptors/air.interceptor';

@NgModule({
  declarations: [NotFoundPageComponent],
  providers: [AirHttpService, LocalstorageService, { provide: HTTP_INTERCEPTORS, useClass: AirInterceptor, multi: true }],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [NotFoundPageComponent],
})
export class CoreModule {}
