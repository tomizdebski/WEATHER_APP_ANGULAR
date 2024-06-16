import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { FetchDataService } from '../fetchData.service';

@Component({
  selector: 'app-temperature-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.css'],
})
export class TemperatureChartComponent {
  private serviceFetch = inject(FetchDataService);

  get weatherDataHourly() {
    console.log(this.serviceFetch.weatherData);
    return this.serviceFetch.weatherData;
  }

  temperatureForTime(time: string) {
    return this.serviceFetch?.getTemperatureForTime(time);
  }

  public chartSeries: ApexAxisChartSeries = [
    {
      name: 'Temperatura (°C)',
      data: [26, 26, 24, 16],
    },
  ];
  public chartOptions: ApexChart = {
    type: 'line',
    height: 200,
  };
  public xaxis: ApexXAxis = {
    categories: ['Morning', 'Afternoon', 'Evening', 'Night'],
  };
  public title: ApexTitleSubtitle = {
    align: 'center',
  };
}
