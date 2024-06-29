import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RightSideNavComponent } from './right-side-nav/right-side-nav.component';
import { LeftSideNavComponent } from './left-side-nav/left-side-nav.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ExperienceComponent } from './experience/experience.component';
import { RouterModule, Routes } from '@angular/router';
// import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CandidateProfileService } from './candidateprofile-service.service';  // Import your service
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RightSideNavComponent,
    LeftSideNavComponent,
    MainContentComponent,
  ],
  imports: [
    // BrowserModule,
    AppRoutingModule,MatMenuModule,
    // NgModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // MatButtonToggleModule,
    // BrowserAnimationsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatSelectModule,
    // MatButtonModule,
    // HttpClientModule,
    // BrowserModule,
    RouterModule,
    // MatDialogModule,
  ],
  providers: [CandidateProfileService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    console.log('profile module works');
  }
}