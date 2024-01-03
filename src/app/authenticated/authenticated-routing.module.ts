import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticatedComponent } from "./authenticated.component";
// import { HistoryComponent } from "projects/history/src/app/history/history.component";
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
      { path: 'history', loadChildren: () => import('../../../projects/history/src/app/history/history.module').then(m => m.HistoryModule) },
      { path: 'call-detail', loadChildren: () => import('../../../projects/calldetails/src/app/call-detail/call-detail.module').then(m => m.CallDetailModule) },
      { path: 'internaldatabase', loadChildren: () => import('../../../projects/internaldatabase/src/app/internal-database/internal-database.module').then(m => m.InternalDatabaseModule) },
      
      // { path: 'call-view', loadChildren: () => import('./pages/call-detail/candidate-call-view/candidate-call-view.module').then(m => m.CandidateCallViewModule) },
      
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