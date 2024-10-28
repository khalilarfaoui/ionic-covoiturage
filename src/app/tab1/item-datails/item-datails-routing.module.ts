import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemDatailsPage } from './item-datails.page';

const routes: Routes = [
  {
    path: ':id',
    component: ItemDatailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemDatailsPageRoutingModule {}
