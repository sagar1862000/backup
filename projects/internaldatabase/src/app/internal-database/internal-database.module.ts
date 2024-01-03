import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalDatabaseRoutingModule } from './internal-database-routing.module';
import { InternalDatabaseComponent } from './internal-database.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
////import { ComponentsModule } from '../../shared/components.module';


@NgModule({
  declarations: [
    InternalDatabaseComponent
  ],
  imports: [
    CommonModule,
    InternalDatabaseRoutingModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    RouterModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class InternalDatabaseModule { }
