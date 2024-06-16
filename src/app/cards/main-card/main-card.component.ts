import { Component, inject } from '@angular/core';
import { FetchDataService } from '../../fetchData.service';
import { DatePipe } from '@angular/common';
import { TemperatureChartComponent } from '../../temperature-chart/temperature-chart.component';

@Component({
  selector: 'app-main-card',
  standalone: true,
  imports: [TemperatureChartComponent],
  templateUrl: './main-card.component.html',
  styleUrl: './main-card.component.css',
  providers: [DatePipe],
})
export class MainCardComponent {
  private serviceFetch = inject(FetchDataService);

  // constructor(private datePipe: DatePipe) {}

  // currentDate = new Date();

  get reelFeel() {
    return this.serviceFetch?.fetchedData?.main.feels_like;
  }

  get humidity() {
    return this.serviceFetch?.fetchedData?.main.humidity;
  }

  get windSpeed() {
    const speedInMetersPerSecond = this.serviceFetch?.fetchedData?.wind.speed;
    const speedInKilometersPerHour = speedInMetersPerSecond! * 3.6;
    return speedInKilometersPerHour;
  }

  get pressure() {
    return this.serviceFetch?.fetchedData?.main.pressure;
  }

  get location() {
    return this.serviceFetch.location;
  }

  get temperature() {
    return this.serviceFetch.temperature;
  }

  get weatherIcon() {
    return '/assets/weatherIcons/' + this.serviceFetch.icon + '.svg';
  }

  get date() {
    const currentDate = new Date();
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric' as 'numeric' | '2-digit' | undefined,
    };
    return currentDate.toLocaleDateString(
      'en-US',
      options as Intl.DateTimeFormatOptions
    );
  }

  get data() {
    return this.serviceFetch.fetchedData;
  }
  get time() {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
    };
    return currentDate.toLocaleTimeString('en-US', options);
  }
}
