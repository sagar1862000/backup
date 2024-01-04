import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentActivityRoutingModule } from './recent-activity-routing.module';
import { RecentActivityComponent } from './recent-activity.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    RecentActivityComponent
  ],
  imports: [
    CommonModule,
    RecentActivityRoutingModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class RecentActivityModule { }
