import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalDatabaseRoutingModule } from './internal-database-routing.module';
import { InternalDatabaseComponent } from './internal-database.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { DialogConfig } from '@angular/cdk/dialog';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import { MatChipsModule } from '@angular/material/chips';
@NgModule({
  declarations: [
    InternalDatabaseComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
    InternalDatabaseRoutingModule,
    CommonModule, 
    FormsModule,
     ReactiveFormsModule, 
     MatInputModule,
     ComponentsModule,
     MatFormFieldModule,
     MatSelectModule,
     MatButtonToggleModule,
     MatDialogModule,
     MatChipsModule
  ],
  providers:[DialogConfig],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class InternalDatabaseModule { }
