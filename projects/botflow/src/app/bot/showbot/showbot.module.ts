import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowbotRoutingModule } from './showbot-routing.module';
import { ShowbotComponent } from './showbot.component';
import { ComponentsModule } from '../../../../../component/src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    ShowbotComponent
  ],
  imports: [
    CommonModule,
    ShowbotRoutingModule,
    ComponentsModule,
    FormsModule,
    MatToolbarModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ShowbotModule { }
