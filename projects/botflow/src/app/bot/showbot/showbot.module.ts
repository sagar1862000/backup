import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowbotRoutingModule } from './showbot-routing.module';
import { ShowbotComponent } from './showbot.component';


@NgModule({
  declarations: [
    ShowbotComponent
  ],
  imports: [
    CommonModule,
    ShowbotRoutingModule
  ]
})
export class ShowbotModule { }
