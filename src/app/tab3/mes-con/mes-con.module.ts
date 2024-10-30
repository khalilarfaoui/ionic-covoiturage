import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesConPageRoutingModule } from './mes-con-routing.module';

import { MesConPage } from './mes-con.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesConPageRoutingModule
  ],
  declarations: [MesConPage]
})
export class MesConPageModule {}
