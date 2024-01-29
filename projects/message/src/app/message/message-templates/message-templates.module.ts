import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageTemplatesRoutingModule } from './message-templates-routing.module';
import { MessageTemplatesComponent } from './message-templates.component';
import { ComponentsModule } from '../../../../../component/src/app/components/components.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MessageTemplatesComponent
  ],
  imports: [
    CommonModule,
    MessageTemplatesRoutingModule,
    ComponentsModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MessageTemplatesModule { }
