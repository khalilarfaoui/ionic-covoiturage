import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'map',
    loadChildren: () => import('../tab1/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'pickup-location',
    loadChildren: () => import('../tab1/pickup-location/pickup-location.module').then( m => m.PickupLocationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
