
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicalDataWindfarm } from './pages/technical-data-windfarm/technical-data-windfarm';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {path : '',  redirectTo: 'dashBoard-campaña-2025',pathMatch: 'full'},
    {path : 'dashBoard-campaña-2025', component: Dashboard},
    {path : 'ficha-tecnica-windfarm/:id', component: TechnicalDataWindfarm} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
