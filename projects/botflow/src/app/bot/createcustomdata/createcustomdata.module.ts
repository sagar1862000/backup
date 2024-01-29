import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatecustomdataRoutingModule } from './createcustomdata-routing.module';
import { CreatecustomdataComponent } from './createcustomdata.component';


@NgModule({
  declarations: [
    CreatecustomdataComponent
  ],
  imports: [
    CommonModule,
    CreatecustomdataRoutingModule
  ]
})
export class CreatecustomdataModule { }
