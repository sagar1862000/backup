import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewjobComponent } from './newjob/newjob.component';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AllRoundPageComponent } from './all-round-page/all-round-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    NewjobComponent,
    StartingPageComponent,
    AllRoundPageComponent,
  ],
  imports: [
    AppRoutingModule,
    // BrowserModule,
    // CKEditorModule,
    // ReactiveFormsModule,
    FormsModule,
    // BrowserAnimationsModule,
    MatSelectModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    CommonModule,
    // RouterModule.forRoot([]), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('journey module loaded');
  }
}
