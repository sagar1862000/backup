import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewHiringComponent } from './create-new-hiring.component';

const routes: Routes = [
  { path: '', component: CreateNewHiringComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateNewHiringRoutingModule { }
