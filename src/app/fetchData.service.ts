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
}
