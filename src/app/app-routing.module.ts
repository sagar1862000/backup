import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LogoutComponent } from './non-authenticated/pages/logout/logout.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./authenticated/authenticated.module').then(m => m.AuthenticatedModule) },
  { path: 'login', loadChildren: () => import('./non-authenticated/non-authenticated.module').then(m => m.NonAuthenticatedModule) },
  { path: 'api', loadChildren: () => import('./non-authenticated/non-authenticated.module').then(m => m.NonAuthenticatedModule) },



  // { path: '**', loadChildren: () => import('./notfound/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
