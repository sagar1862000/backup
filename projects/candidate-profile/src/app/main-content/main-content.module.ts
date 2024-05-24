import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MainContentComponent } from './main-content.component';


@NgModule({
  declarations: [
    MainContentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgModule,
    MatDialogModule
  ]
})
export class MainContentModule { }
