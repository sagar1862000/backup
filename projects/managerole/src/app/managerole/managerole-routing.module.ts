import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageroleComponent } from './managerole.component';
import { CreateAreasComponent } from './create-areas/create-areas.component';
import { CreateUserRolesComponent } from './create-user-roles/create-user-roles.component';
import { CreatePermissionComponent } from './create-permission/create-permission.component';

const routes: Routes = [
  {path:'', component:ManageroleComponent,
  children: [
    { path: 'create-areas', component: CreateAreasComponent },
    { path: 'create-user-roles', component: CreateUserRolesComponent },
    { path: 'create-permission', component: CreatePermissionComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageroleRoutingModule { }
