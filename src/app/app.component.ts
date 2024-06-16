import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { HeaderComponent } from './header/header.component';
import { FetchDataService } from './fetchData.service';
import { MainCardComponent } from './cards/main-card/main-card.component';
import { GeolocationService } from './geolocation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    ThemeToggleComponent,
    HeaderComponent,
    CommonModule,
    MainCardComponent,
  ],
})
export class AppComponent implements OnInit {
  private serviceFetch = inject(FetchDataService);
  private geolocationService = inject(GeolocationService);

  title = 'weather app';
  position: GeolocationPosition | null = null;
  error: string | null = null;

  ngOnInit() {
    this.geolocationService.getCurrentPosition().then(
      (position) => {
        this.position = position;
        console.log(position);
        this.serviceFetch.fetchWeatherByCoords(
          this.position!.coords.latitude,
          this.position!.coords.longitude
        );
        this.serviceFetch.fetchHourlyWeather(
          this.position!.coords.latitude,
          this.position!.coords.longitude
        );
      },
      (err) => {
        this.error = err.message;
      }
    );
  }

  get weatherIcon() {
    return '/assets/weatherIcons/' + this.serviceFetch.icon + '.svg';
  }

  get data() {
    return this.serviceFetch.fetchedData;
  }
}
