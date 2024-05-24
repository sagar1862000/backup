import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackerFieldsComponent } from './tracker-fields.component';

const routes: Routes = [{
  path:'', component:TrackerFieldsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerFieldsRoutingModule { }
