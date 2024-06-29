import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateactionComponent } from './createaction.component'

const routes: Routes = [
  {
    path: '', component: CreateactionComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateactionRoutingModule { }
