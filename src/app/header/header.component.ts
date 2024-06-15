import { Component, inject } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ThemeService } from '../theme.service';
import { FormsModule } from '@angular/forms';
import { FetchDataService } from '../fetchData.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeToggleComponent, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  enteredSearch = '';
  private serviceFetch = inject(FetchDataService);

  constructor(private themeService: ThemeService) {}

  async onSearch() {
    const data = await this.serviceFetch.fetchCurrentWeather(
      this.enteredSearch
    );
    console.log('header', data);
  }

  get location() {
    return this.serviceFetch.location;
  }

  get temperature() {
    return this.serviceFetch.temperature;
  }

  get isDarkMode() {
    return this.themeService.isDarkMode();
  }
}
