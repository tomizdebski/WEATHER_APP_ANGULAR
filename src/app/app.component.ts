import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { HeaderComponent } from './header/header.component';
import { FetchDataService } from './fetchData.service';
import { MainCardComponent } from './cards/main-card/main-card.component';

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
export class AppComponent {
  private serviceFetch = inject(FetchDataService);
  title = 'weather app';
  city = 'Warszawa';

  get weatherIcon() {
    return '/assets/weatherIcons/' + this.serviceFetch.icon + '.svg';
  }

  get data() {
    return this.serviceFetch.fetchedData;
  }
}
