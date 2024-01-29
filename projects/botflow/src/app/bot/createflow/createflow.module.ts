import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateflowRoutingModule } from './createflow-routing.module';
import { CreateflowComponent } from './createflow.component';


@NgModule({
  declarations: [
    CreateflowComponent
  ],
  imports: [
    CommonModule,
    CreateflowRoutingModule
  ]
})
export class CreateflowModule { }
