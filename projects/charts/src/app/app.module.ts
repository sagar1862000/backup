import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { BargraphComponent } from './charts/bargraph/bargraph.component';
import { BubblechartComponent } from './charts/bubblechart/bubblechart.component';
import { CircularProgressComponent } from './charts/circular-progress/circular-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    BargraphComponent,
    BubblechartComponent,
    CircularProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
