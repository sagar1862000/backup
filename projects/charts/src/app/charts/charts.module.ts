import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BargraphComponent } from './bargraph/bargraph.component';
import { CircularProgressComponent } from './circular-progress/circular-progress.component';
import { BubblechartComponent } from './bubblechart/bubblechart.component';


@NgModule({
  declarations: [
    BarChartComponent,
    BargraphComponent,
    CircularProgressComponent,
    BubblechartComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule
  ],
  exports:[
    BarChartComponent,
    BargraphComponent,
    CircularProgressComponent,
    BubblechartComponent
  ]
})
export class ChartsModule { }
