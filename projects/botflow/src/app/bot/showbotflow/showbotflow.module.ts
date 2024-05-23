import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowbotflowRoutingModule } from './showbotflow-routing.module';
import { ShowbotflowComponent } from './showbotflow.component';


@NgModule({
  declarations: [
    ShowbotflowComponent
  ],
  imports: [
    CommonModule,
    ShowbotflowRoutingModule
  ]
})
export class ShowbotflowModule { }
