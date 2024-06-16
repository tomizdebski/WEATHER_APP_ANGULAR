import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-temperature-forecast',
  standalone: true,
  imports: [],
  templateUrl: './temperature-forecast.component.html',
  styleUrl: './temperature-forecast.component.css',
})
export class TemperatureForecastComponent implements OnInit {
  weatherData: any;
  errorMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    // Współrzędne Warszawy
    const lat = 52.2297;
    const lon = 21.0122;
    const apiKey = environment.apiKey; // Twój klucz API

    // URL do OpenWeather API
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${apiKey}`;

    // Wykonaj zapytanie HTTP
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.weatherData = data;
        console.log('zapytanie_godzinowe', data);
      })
      .catch((error) => {
        this.errorMessage = 'Wystąpił błąd podczas pobierania danych.';
        console.error('Błąd:', error);
      });
  }

  getTemperatureForTime(time: string): number | null {
    switch (time) {
      case 'morning':
        return this.getTemperatureAtHour(8);
      case 'noon':
        return this.getTemperatureAtHour(12);
      case 'evening':
        return this.getTemperatureAtHour(18);
      case 'night':
        return this.getTemperatureAtHour(24);
      default:
        return null;
    }
  }

  private getTemperatureAtHour(hour: number): number | null {
    if (!this.weatherData || !this.weatherData.hourly) {
      return null;
    }
    const targetTime = new Date().setHours(hour, 0, 0, 0) / 1000;
    const data = this.weatherData.hourly.find(
      (entry: any) => entry.dt >= targetTime
    );
    return data ? data.temp : null;
  }
}
