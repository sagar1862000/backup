import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonAuthenticatedComponent } from "./non-authenticated.component";
import { LoginComponent } from "./login/login.component";


const routes: Routes = [
  {
    path: '', component: NonAuthenticatedComponent,
    children: [
        { path: '', component: LoginComponent },
        { path: 'reset-password/:uid/:token', component: LoginComponent },
        
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NonAuthenticatedRoutingModule { }




