import { Component, inject } from '@angular/core';
import { FetchDataService } from '../../fetchData.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-main-card',
  standalone: true,
  imports: [],
  templateUrl: './main-card.component.html',
  styleUrl: './main-card.component.css',
  providers: [DatePipe],
})
export class MainCardComponent {
  private serviceFetch = inject(FetchDataService);

  // constructor(private datePipe: DatePipe) {}

  // currentDate = new Date();

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
