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
      { path: 'call_detail_report', loadChildren: () => import('../../../projects/candidate-call-report/src/app/call-detail-report/call-detail-report.module').then(m => m.CallDetailReportModule) },
      { path: 'recent-activity', loadChildren: () => import('../../../projects/settings/src/app/recent-activity/recent-activity.module').then(m => m.RecentActivityModule) },
      { path: 'user-profile', loadChildren: () => import('../../../projects/profile/src/app/user-profile/user-profile.module').then(m => m.UserProfileModule) },
      { path: 'managerole', loadChildren: () => import('../../../projects/managerole/src/app/managerole/managerole.module').then(m => m.ManageroleModule) },
      { path: 'candidate-status', loadChildren: () => import('../../../projects/candidate-status/src/app/candidate-status/candidate-status.module').then(m => m.CandidateStatusModule) },
      

      { path: 'new-job', loadChildren: () => import('../../../projects/newjob/src/app/new-job/new-job.module').then(m => m.NewJobModule) },

      { path: 'billing-detail', loadChildren: () => import('../../../projects/settings/src/app/billing-details/billing-details.module').then(m => m.BillingDetailsModule) },

      { path: 'department', loadChildren: () => import('../../../projects/settings/src/app/department/department.module').then(m => m.DepartmentModule) },

      { path: 'agency', loadChildren: () => import('../../../projects/settings/src/app/agency/agency.module').then(m => m.AgencyModule) },

      // { path: 'new-trackers', loadChildren: () => import('./../tracker-fields/tracker-fields.module').then(m => m.TrackerFieldsModule) },

      { path: 'trackers', loadChildren: () => import('../../../projects/settings/src/app/add-new-tracker/add-new-tracker.module').then(m => m.AddNewTrackerModule) },
      
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