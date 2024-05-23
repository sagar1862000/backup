import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyJobComponent } from './my-job.component';

const routes: Routes = [{
  path: '',
  component: MyJobComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyJobRoutingModule { }
