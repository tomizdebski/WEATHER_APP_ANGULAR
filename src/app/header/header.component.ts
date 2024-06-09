import { Component, inject } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ThemeService } from '../theme.service';
import { FormsModule } from '@angular/forms';
import { FetchDataService } from '../fetchData.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeToggleComponent, FormsModule],
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
    console.log(data);
  }

  get location() {
    return this.serviceFetch.location;
  }

  get dataWeather() {
    return this.serviceFetch.dataWeather;
  }

  get isDarkMode() {
    return this.themeService.isDarkMode();
  }
}
