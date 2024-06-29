import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrgridComponent } from './prgrid/prgrid.component';
import { GridinternaldataComponent } from './gridinternaldata/gridinternaldata.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';


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
    ComponentsModule,
    RouterModule,
    MatCheckboxModule,
    MatTabsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatToolbarModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports:[ PrgridComponent,
    GridinternaldataComponent
    ],
})
export class GridModule { }
