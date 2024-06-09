import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { HeaderComponent } from './header/header.component';
import { FetchDataService } from './fetchData.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, ThemeToggleComponent, HeaderComponent],
})
export class AppComponent {
  title = 'test_theme_switch';
  city = 'Warszawa';
  constructor(private fetchDataService: FetchDataService) {}

  async fetchCurrentWeather() {
    const data = await this.fetchDataService.fetchCurrentWeather(this.city);
    console.log(data);
  }
}
