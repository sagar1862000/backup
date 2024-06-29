import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ActivatedRoute } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component:AppComponent
    // redirectTo: 'candidateProfile',
    // pathMatch: 'full',
  },
  // {
  //   path:'candidateProfile',
  //   component: AppComponent
  // }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(public route : ActivatedRoute ){}
  ngOninit(){}
}