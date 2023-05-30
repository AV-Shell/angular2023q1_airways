import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { GithublinkComponent } from './components/githublink/githublink.component';

@NgModule({
  declarations: [FooterComponent, GithublinkComponent],
  imports: [CommonModule],
  exports: [FooterComponent],
})
export class FooterModule {}
