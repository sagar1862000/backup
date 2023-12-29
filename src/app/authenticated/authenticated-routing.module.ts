import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticatedComponent } from "./authenticated.component";
// import { authGuard } from "../auth/auth.guard";

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'myjob',
    pathMatch: 'full',
  },
  {
    path: '', component: AuthenticatedComponent,
    children: [

      { path: 'myjob', loadChildren: () => import('../../../projects/myjob/src/app/my-job/my-job.module').then(m => m.MyJobModule),},
      // { path: 'history', loadChildren: () => import('../../../projects/candidate-history/src/app/history/history.module').then(m => m.HistoryModule) },

]
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule {
}