import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallDetailComponent } from './call-detail.component';

const routes: Routes = [{
  path:'', component:CallDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallDetailRoutingModule { }
