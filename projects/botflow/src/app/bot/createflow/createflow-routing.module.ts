import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateflowComponent } from './createflow.component'

const routes: Routes = [
  {
    path: '', component: CreateflowComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateflowRoutingModule { }
