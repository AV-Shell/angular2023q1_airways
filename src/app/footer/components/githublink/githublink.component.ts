import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-githublink',
  templateUrl: './githublink.component.html',
  styleUrls: ['./githublink.component.scss'],
})
export class GithublinkComponent {
  @Input() link = '';

  get githubLink() {
    return `https://github.com/${this.link}`;
  }
}
