import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalDatabaseComponent } from './internal-database.component';

const routes: Routes = [
  {path:'', component:InternalDatabaseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalDatabaseRoutingModule {}