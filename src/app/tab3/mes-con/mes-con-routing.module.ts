import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesConPage } from './mes-con.page';

const routes: Routes = [
  {
    path: '',
    component: MesConPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesConPageRoutingModule {}
