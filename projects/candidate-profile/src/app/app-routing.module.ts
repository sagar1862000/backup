import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
console.log('hello');
const routes: Routes = [
  {
    path: '',
    redirectTo: 'candidateProfile',
    pathMatch: 'full',
  },
  {
    path:'candidateProfile',
    component: AppComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
