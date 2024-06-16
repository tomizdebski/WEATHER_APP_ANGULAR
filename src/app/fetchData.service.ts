import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const apiKey = environment.apiKey;

interface WeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
    deg: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  url = 'http://api.openweathermap.org';
  apiKey = environment.apiKey;
  location = '';
  temperature = '';
  icon = '';
  fetchedData: WeatherData | undefined = undefined;
  weatherData: any;

  constructor() {
    console.log('FetchDataService created');
  }

  async fetchHourlyWeather(lat: number, lon: number) {
    const response = await fetch(
      `${this.url}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${this.apiKey}&units=metric`
    );
    const data = await response.json();
    console.log('hourly data:', data);
    this.weatherData = data;
    return data;
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
    console.log('hourly_temp', Math.round(data.temp));
    return data ? Math.round(data.temp) : null;
  }

  async fetchCurrentWeather(city: string) {
    const response = await fetch(
      `${this.url}/geo/1.0/direct?q=${city}&appid=${this.apiKey}`
    );
    const data = await response.json();
    const lat = data[0].lat;
    const lon = data[0].lon;

    const responseFinal = await fetch(
      `${this.url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );
    const dataFinal = await responseFinal.json();
    this.location = dataFinal.name;
    this.temperature = dataFinal.main.temp;
    this.icon = dataFinal.weather[0].icon;
    this.fetchedData = dataFinal;
    console.log('service data:', dataFinal);
    return dataFinal;
  }

  async fetchWeatherByCoords(lat: number, lon: number) {
    const response = await fetch(
      `${this.url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );
    const data = await response.json();
    this.location = data.name;
    this.temperature = data.main.temp;
    this.icon = data.weather[0].icon;
    this.fetchedData = data;
    console.log('service data:', data);
    return data;
  }

  async fetchWeatherByZip(zip: number) {
    const response = await fetch(
      `${this.url}/data/2.5/weather?zip=${zip}&appid=${this.apiKey}&units=metric`
    );
    const data = await response.json();
    this.location = data.name;
    this.temperature = data.main.temp;
    this.icon = data.weather[0].icon;
    this.fetchedData = data;
    console.log('service data:', data);
    return data;
  }

  async fetchWeatherByCity(city: string) {
    const response = await fetch(
      `${this.url}/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
    );
    const data = await response.json();
    this.location = data.name;
    this.temperature = data.main.temp;
    this.icon = data.weather[0].icon;
    this.fetchedData = data;
    console.log('service data:', data);
    return data;
  }

  async fetchWeatherByCityId(cityId: number) {
    const response = await fetch(
      `${this.url}/data/2.5/weather?id=${cityId}&appid=${this.apiKey}&units=metric`
    );
    const data = await response.json();
    this.location = data.name;
    this.temperature = data.main.temp;
    this.icon = data.weather[0].icon;
    this.fetchedData = data;
    console.log('service data:', data);
    return data;
  }
}
