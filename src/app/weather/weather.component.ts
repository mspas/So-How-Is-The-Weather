import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { CurrentWeatherData } from "../models/current-weather.model";
import cities from "../city.list.json";
import { CityData } from "../models/city.model";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.sass"]
})
export class WeatherComponent implements OnInit {
  MAX_VALUE = 100000;

  weatherData: any = null;
  currentWeather: CurrentWeatherData;
  citiesList: CityData[] = cities;
  geolocationData: any;
  foundCity: CityData;

  constructor(private _api: ApiService) {}

  ngOnInit() {
    let cityPicker = {
      diff: this.MAX_VALUE,
      cityData: new CityData(-1, "x", "xy", { lon: 0, lat: 0 })
    };

    this.getLocation().then(location => {
      this.geolocationData = { lon: location.lon, lat: location.lat };

      for (let i = 0; i < this.citiesList.length; i++) {
        const city = this.citiesList[i];

        let lonDiff = this.geolocationData.lon - city.coord.lon;
        let latDiff = this.geolocationData.lat - city.coord.lat;
        let diff = Math.sqrt(Math.pow(lonDiff, 2) + Math.pow(latDiff, 2));

        if (diff < cityPicker.diff) {
          cityPicker.diff = diff;
          cityPicker.cityData = city;
        }
        if (diff < 0.05) {
          //approx difference inside a city like wroclaw
          break;
        }
      }

      this._api.getWeather(cityPicker.cityData.id).subscribe(data => {
        this.weatherData = data;
        this.foundCity = cityPicker.cityData;
        console.log(this.weatherData.weather.main);
      });
      console.log(cityPicker.cityData.name);
    });
  }

  getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({ lon: resp.coords.longitude, lat: resp.coords.latitude });
        },
        err => {
          reject(err);
        }
      );
    });
  }

  click() {
    this._api.getWeather(2172797).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData.base);
    });
    //console.log(JSON.stringify(this.weather));
  }
}
