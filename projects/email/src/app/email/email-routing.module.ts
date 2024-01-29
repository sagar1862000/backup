import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'email-template',
    pathMatch: 'full',
  },
  {
    path: '', component: EmailComponent,
    children: [
      { path: 'email-template', loadChildren: () => import('./email-template/email-template.module').then(m => m.EmailTemplateModule) },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
