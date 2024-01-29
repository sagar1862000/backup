import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatecustomdataRoutingModule } from './createcustomdata-routing.module';
import { CreatecustomdataComponent } from './createcustomdata.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    CreatecustomdataComponent
  ],
  imports: [
    CommonModule,
    CreatecustomdataRoutingModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class CreatecustomdataModule { }
