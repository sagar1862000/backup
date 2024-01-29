import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageTemplatesRoutingModule } from './message-templates-routing.module';
import { MessageTemplatesComponent } from './message-templates.component';


@NgModule({
  declarations: [
    MessageTemplatesComponent
  ],
  imports: [
    CommonModule,
    MessageTemplatesRoutingModule
  ]
})
export class MessageTemplatesModule { }
