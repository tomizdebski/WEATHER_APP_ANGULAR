import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

@Component({
  selector: 'app-temperature-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.css'],
})
export class TemperatureChartComponent {
  public chartSeries: ApexAxisChartSeries = [
    {
      name: 'Temperatura (°C)',
      data: [15, 22, 18, 10],
    },
  ];
  public chartOptions: ApexChart = {
    type: 'bar',
    height: 350,
  };
  public xaxis: ApexXAxis = {
    categories: ['Rano', 'Południe', 'Wieczór', 'Noc'],
  };
  public title: ApexTitleSubtitle = {
    text: 'Temperatura w ciągu dnia',
    align: 'center',
  };
}
