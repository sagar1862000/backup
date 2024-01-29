import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatebotComponent } from './createbot.component'

const routes: Routes = [
  {
    path: '', component: CreatebotComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatebotRoutingModule { }
