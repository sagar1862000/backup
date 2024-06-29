import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageTemplatesComponent} from './message-templates.component'

const routes: Routes = [
  {
    path: '', component: MessageTemplatesComponent,
    children: [
      { path: 'create-new', loadChildren: () => import('./create/create.module').then(m => m.CreateModule) },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageTemplatesRoutingModule { }
