import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiringManagerRoutingModule } from './hiring-manager-routing.module';
import { HiringManagerComponent } from './hiring-manager.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import { MasterService } from 'src/app/services/master.service';
import { MatOptionModule } from '@angular/material/core';
import { GridModule } from '../../../../grid/src/app/grid/grid.module';


@NgModule({
  declarations: [
    HiringManagerComponent
  ],
  imports: [
    CommonModule,
    HiringManagerRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    // AgGridModule,
    ComponentsModule,
    MatToolbarModule,
    MatOptionModule,
    GridModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[MasterService]
})
export class HiringManagerModule { }
