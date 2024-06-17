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

  temperatureForTime(
    time1: number,
    time2: number,
    time3: number,
    time4: number
  ) {
    const temp1 = this.serviceFetch.getTemperatureAtHour(time1);
    const temp2 = this.serviceFetch.getTemperatureAtHour(time2);
    const temp3 = this.serviceFetch.getTemperatureAtHour(time3);
    const temp4 = this.serviceFetch.getTemperatureAtHour(time4);
    return [temp1, temp2, temp3, temp4];
  }

  public chartSeries: ApexAxisChartSeries = [
    {
      name: 'Temperatura (°C)',
      data: this.temperatureForTime(6, 12, 18, 23),
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
