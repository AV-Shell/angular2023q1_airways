import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './store/models';
import { startAppAction } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular2023q1_airways';

  constructor(private store: Store<IAppState>) {}
  ngOnInit() {
    this.store.dispatch(startAppAction());
  }
}
