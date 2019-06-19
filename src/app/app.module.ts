import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { LineChart1Component } from './line-chart.1/line-chart.component';
import { LineChart2Component } from './line-chart.2/line-chart.component';

/*  Problemas con el frontend.
**  Deberíamos usar 3 instancias de LineChartComponent, no 3 componentes distintos.
*/
@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    LineChart1Component,
    LineChart2Component,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
