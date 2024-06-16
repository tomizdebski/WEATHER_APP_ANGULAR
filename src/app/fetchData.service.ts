import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  url = 'http://api.openweathermap.org';
  apiKey = environment.apiKey;
  location = '';
  temperature = '';
  icon = '';
  fetchedData = undefined;

  constructor() {
    console.log('FetchDataService created');
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
