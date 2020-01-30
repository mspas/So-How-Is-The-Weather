import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiService {
  url = "http://api.openweathermap.org/data/2.5/";
  key = "482efa03227cdb991cce6a9c7467152d";

  constructor(private _http: HttpClient) {}

  getWeather(cityId: number) {
    let type = "weather";
    let call =
      this.url +
      type +
      "?id=" +
      cityId.toString() +
      "&units=metric&APPID=" +
      this.key;
    return this._http.get(call);
  }

  get5Days(cityId: number) {
    let type = "forecast";
    let call =
      this.url +
      type +
      "?id=" +
      cityId.toString() +
      "&units=metric&APPID=" +
      this.key;
    return this._http.get(call);
  }
}
