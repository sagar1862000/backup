import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowbotComponent } from './showbot.component'

const routes: Routes = [
  {
    path: '', component: ShowbotComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowbotRoutingModule { }
