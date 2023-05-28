import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  {
    path: 'flight-selection',
    loadChildren: () => import('./flight-selection/flight-selection.module').then(m => m.FlightSelectionModule),
  },
  {
    path: 'passengers-info',
    loadChildren: () => import('./passengers-info/passengers-info.module').then(m => m.PassengersInfoModule),
  },
  { path: 'summary', loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
