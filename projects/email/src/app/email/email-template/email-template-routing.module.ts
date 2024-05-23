import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailTemplateComponent } from './email-template.component';


const routes: Routes = [
  {
    path: '', component: EmailTemplateComponent,
    children: [
      { path: 'create-new', loadChildren: () => import('./create/create.module').then(m => m.CreateModule) },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailTemplateRoutingModule { }
