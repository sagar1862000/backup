import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageroleRoutingModule } from './managerole-routing.module';
import { ManageroleComponent } from './managerole.component';
import { CreateAreasComponent } from './create-areas/create-areas.component';
import { CreatePermissionComponent } from './create-permission/create-permission.component';
import { CreateUserRolesComponent } from './create-user-roles/create-user-roles.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [
    ManageroleComponent,
    CreateAreasComponent,
    CreatePermissionComponent,
    CreateUserRolesComponent
  ],
  imports: [
    CommonModule,
    ManageroleRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    FormsModule,
    MatInputModule
    
  ]
})
export class ManageroleModule { }
