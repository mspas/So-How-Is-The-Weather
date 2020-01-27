import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  url = "http://api.openweathermap.org/data/2.5/";
  key = "123";

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
}
