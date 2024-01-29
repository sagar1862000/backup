import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotRoutingModule } from './bot-routing.module';
import { BotComponent } from './bot.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BotComponent
  ],
  imports: [
    CommonModule,
    BotRoutingModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class BotModule { }
