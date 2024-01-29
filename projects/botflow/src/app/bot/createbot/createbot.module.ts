import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatebotRoutingModule } from './createbot-routing.module';
import { CreatebotComponent } from './createbot.component';


@NgModule({
  declarations: [
    CreatebotComponent
  ],
  imports: [
    CommonModule,
    CreatebotRoutingModule
  ]
})
export class CreatebotModule { }
