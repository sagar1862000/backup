import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateintentComponent } from './createintent.component'

const routes: Routes = [
  {
    path: '', component: CreateintentComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateintentRoutingModule { }
