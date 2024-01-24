import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryUiComponent } from './primary-ui/primary-ui.component';
import { FooterComponent } from './primary-ui/footer/footer.component';
import { SidenavComponent } from './primary-ui/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { SublevelMenuComponent } from './primary-ui/sidenav/sublevel-menu.component';
import { HeadbarComponent } from './primary-ui/headbar/headbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticatedComponent } from './authenticated.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../services/user.service';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    PrimaryUiComponent,
    FooterComponent,
    SidenavComponent,
    SublevelMenuComponent,
    HeadbarComponent,
    AuthenticatedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    CommonModule, MatProgressBarModule,
    MatIconModule,
    AuthenticatedRoutingModule,
    MatNativeDateModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    // FontAwesomeModule,
    MatSelectModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ UserService],

})
export class AuthenticatedModule { }





        
