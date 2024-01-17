import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiringManagerComponent } from './hiring-manager.component';

const routes: Routes = [

  {
    path: '', component: HiringManagerComponent,
    children: [
      { path: 'create-new-hiring', loadChildren: () => import('./create-new-hiring/create-new-hiring.module').then(m => m.CreateNewHiringModule) },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HiringManagerRoutingModule { }
