import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonAuthenticatedRoutingModule } from './non-authenticated-routing.module';
import { NonAuthenticatedComponent } from './non-authenticated.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
// import { NgSelectModule } from "@ng-select/ng-select";
// import { TypingDirective } from "../_directive/typing/typing.directive";
// import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    NonAuthenticatedComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    NonAuthenticatedRoutingModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatTabsModule,
    // NgSelectModule,
    ReactiveFormsModule,
    
  ],
  // bootstrap: [NonAuthenticatedComponent]

})
export class NonAuthenticatedModule { }





