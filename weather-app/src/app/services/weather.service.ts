import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WeatherData } from '../model/weather.model';

const apiKey = '37033d9938464911e42960f040c4866a';
const lukapi = 'd6d0177033fce308f106982174512682';
const baseUrl = 'https://api.openweathermap.org';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Credentials': '*',
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrentWeatherByName(
    cityName: string,
    params?: any
  ): Observable<WeatherData> {
    let options = {};

    if (params) {
      options = {
        params: new HttpParams()
          .set('units', 'metric' || '')
          .set('q', cityName || '')
          .set('mode', 'json'),
      };
    }
    return this.http
      .get<WeatherData>(
        `${baseUrl}/data/2.5/weather?q=${cityName}&appid=${lukapi}`,
        options
      )
      .pipe(map((data: any) => data));
  }

  getThreeHourForecast(
    cityName: string,

    params?: any
  ): Observable<WeatherData> {
    let options = {};

    if (params) {
      options = {
        params: new HttpParams()
          .set('units', 'metric' || '')
          .set('q', cityName || '')
          .set('mode', 'json'),
      };
    }
    return this.http
      .get<WeatherData>(
        `${baseUrl}/data/2.5/forecast?q=${cityName}&appid=${lukapi}`,
        options
      )
      .pipe(map((data: any) => data));
  }

  calculateAverageDailyTemperatures(weatherData: any): {
    [date: string]: number;
  } {
    let averageDailyTemperatures: any = {};

    for (let i = 0; i < weatherData.length; i++) {
      let forecast = weatherData[i];
      let date = forecast[i].dt_txt;
      let temperature = forecast[i].main.temp;

      if (!averageDailyTemperatures[date]) {
        averageDailyTemperatures[date] = {
          count: 1,
          total: temperature,
        };
      } else {
        averageDailyTemperatures[date].count++;
        averageDailyTemperatures[date].total += temperature;
      }
    }

    for (let date in averageDailyTemperatures) {
      let avgTempData = averageDailyTemperatures[date];
      averageDailyTemperatures[date] = avgTempData.total / avgTempData.count;
    }

    return averageDailyTemperatures;
  }
}
