import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateslotComponent } from './createslot.component';

const routes: Routes = [
  {
    path: '', component: CreateslotComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateslotRoutingModule { }
