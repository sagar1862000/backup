import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'message-template',
    pathMatch: 'full',
  },
  {
    path: '', component: MessageComponent,
    children: [
      { path: 'message-template', loadChildren: () => import('./message-templates/message-templates.module').then(m => m.MessageTemplatesModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }




