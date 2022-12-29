import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  isDark: boolean = false;
  weatherData: any;
  currentWeather: any;
  cityName: string = '';
  countryCode: string = '';
  days: any = [];

  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

  params = {
    units: 'metric',
  };

  constructor(private service: WeatherService) {}

  ngOnInit() {}

  private getCurrentWeather(cityName: string) {
    this.service.getCurrentWeatherByName(cityName, 'metric').subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentWeather = data;
      },
      error: (err: any) => console.log(err),
    });
  }

  getThreeHourForecast(cityName: string) {
    this.service.getThreeHourForecast(cityName, 'metric').subscribe({
      next: (data: any) => {
        console.log(data);
        this.weatherData = data;
        console.log(this.separateDays());
      },
      error: (err: any) => console.log(err),
    });
  }

  onSubmit() {
    this.getCurrentWeather(this.cityName);
    this.getThreeHourForecast(this.cityName);

    this.cityName = '';
  }

  private separateDays() {
    for (let i = 0; i < this.weatherData.list.length; i++) {
      let currentDate = new Date(this.weatherData.list[i].dt_txt);

      if (!this.days[currentDate.getDate()]) {
        this.days[currentDate.getDate()] = [this.weatherData.list[i].main.temp];
      } else {
        this.days[currentDate.getDate()] = [
          ...this.days[currentDate.getDate()],
          this.weatherData.list[i].main.temp,
        ];
      }
    }
    return this.averageWithin(this.days);
  }

  private average = (arr: any = []) => {
    const sum = arr.reduce((a: any, b: any) => a + b);
    return sum / arr.length;
  };
  private averageWithin = (arr = []) => {
    const res = arr.map((el) => this.average(el));
    return res;
  };
}
