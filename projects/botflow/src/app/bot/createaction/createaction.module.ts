import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateactionRoutingModule } from './createaction-routing.module';
import { CreateactionComponent } from './createaction.component';


@NgModule({
  declarations: [
    CreateactionComponent
  ],
  imports: [
    CommonModule,
    CreateactionRoutingModule
  ]
})
export class CreateactionModule { }
