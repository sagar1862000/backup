import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateintentRoutingModule } from './createintent-routing.module';
import { CreateintentComponent } from './createintent.component';


@NgModule({
  declarations: [
    CreateintentComponent
  ],
  imports: [
    CommonModule,
    CreateintentRoutingModule
  ]
})
export class CreateintentModule { }
