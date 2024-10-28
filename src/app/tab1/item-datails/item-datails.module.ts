import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDatailsPageRoutingModule } from './item-datails-routing.module';

import { ItemDatailsPage } from './item-datails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemDatailsPageRoutingModule
  ],
  declarations: [ItemDatailsPage]
})
export class ItemDatailsPageModule {}
