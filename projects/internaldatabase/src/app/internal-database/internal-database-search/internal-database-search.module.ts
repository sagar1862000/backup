import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalDatabaseSearchRoutingModule } from './internal-database-search-routing.module';
import { InternalDatabaseSearchComponent } from './internal-database-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponentsModule } from 'projects/component/src/app/components/components.module';
import { MasterService } from 'src/app/services/master.service';
import { MatDialogModule } from '@angular/material/dialog';
import { GridModule } from 'projects/grid/src/app/grid/grid.module';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [InternalDatabaseSearchComponent],
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    CommonModule,
    InternalDatabaseSearchRoutingModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatCardModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatDialogModule,
    GridModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MasterService],
})
export class InternalDatabaseSearchModule {}
