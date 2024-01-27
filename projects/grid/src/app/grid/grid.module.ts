import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrgridComponent } from './prgrid/prgrid.component';
import { GridinternaldataComponent } from './gridinternaldata/gridinternaldata.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';


@NgModule({
  declarations: [
    PrgridComponent,
    GridinternaldataComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports:[ PrgridComponent,
    GridinternaldataComponent
    ],
})
export class GridModule { }
