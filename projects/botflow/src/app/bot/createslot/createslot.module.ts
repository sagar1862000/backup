import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateslotRoutingModule } from './createslot-routing.module';
import { CreateslotComponent } from './createslot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CreateslotComponent
  ],
  imports: [
    CommonModule,
    CreateslotRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CreateslotModule { }
