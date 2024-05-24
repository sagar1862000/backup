import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalDatabaseSearchComponent } from './internal-database-search.component';

const routes: Routes = [
  {
    path: '',
  component: InternalDatabaseSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalDatabaseSearchRoutingModule { }
