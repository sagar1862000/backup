import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateslotRoutingModule } from './createslot-routing.module';
import { CreateslotComponent } from './createslot.component';


@NgModule({
  declarations: [
    CreateslotComponent
  ],
  imports: [
    CommonModule,
    CreateslotRoutingModule
  ]
})
export class CreateslotModule { }
