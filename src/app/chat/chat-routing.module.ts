import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPage } from './chat.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPage,
    children: [
      {
        path: 'inbox',
        loadChildren: () => import('./inbox/inbox.module').then( m => m.InboxPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: 'box/:id',
        loadChildren: () => import('./box/box.module').then( m => m.BoxPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/chat/inbox',
        pathMatch: 'full',
      }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
