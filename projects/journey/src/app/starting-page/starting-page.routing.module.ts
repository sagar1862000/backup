import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { InternalDatabaseComponent } from './internal-database.component';
import { StartingPageComponent } from './starting-page.component';
const routes: Routes = [
  { path:'', component:StartingPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalDatabaseRoutingModule {}