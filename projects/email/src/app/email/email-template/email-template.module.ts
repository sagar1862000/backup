import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplateRoutingModule } from './email-template-routing.module';
import { EmailTemplateComponent } from './email-template.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from '../../../../../component/src/app/components/components.module';
import { GridModule } from 'projects/grid/src/app/grid/grid.module';
@NgModule({
  declarations: [
    EmailTemplateComponent
  ],
  imports: [
    CommonModule,
    EmailTemplateRoutingModule,
    MatIconModule,
    MatToolbarModule,
    ComponentsModule,
    GridModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  
})
export class EmailTemplateModule { }
