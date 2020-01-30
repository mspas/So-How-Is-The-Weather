import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/DataService";
import { CityData } from "../models/city.model";
import { WeatherData } from "../models/weather-data.model";
import { ActivatedRoute } from "@angular/router";
import cities from "../city.list.json";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.sass"]
})
export class WeatherComponent implements OnInit {
  private MAX_VALUE = 100000;

  public weatherDataApi: any = null;
  public weatherData: WeatherData;

  public fiveDaysWeatherDataApi: any = null;
  public fiveDaysWeatherData: WeatherData[] = null;

  private citiesList: CityData[] = cities;
  private geolocationData: any;
  public foundCity: CityData;

  constructor(private _api: ApiService, private _data: DataService) {}

  ngOnInit() {
    this._data.searchData$.subscribe(city => {
      console.log(city);
      if (city && city.id != this.foundCity.id) {
        this.getWeather(city.id);
        this.getWeekWeather(cityPicker.cityData.id);
        this.foundCity = city;
      }
    });

    let cityPicker = {
      diff: 100,
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
        if (diff < 0.05) break;
        //approx diffe rence inside a city like wroclaw
      }
      this.foundCity = cityPicker.cityData;
      this.getWeather(cityPicker.cityData.id);
      this.getWeekWeather(cityPicker.cityData.id);
    });
  }

  getWeather(cityId: number) {
    this._api.getWeather(cityId).subscribe(data => {
      this.weatherDataApi = data;
      this.weatherData = new WeatherData(
        this.weatherDataApi.weather[0].id,
        this.weatherDataApi.main.feels_like,
        this.weatherDataApi.weather[0].main,
        this.weatherDataApi.sys.sunrise,
        this.weatherDataApi.sys.sunset,
        new Date()
      );
      console.log(JSON.stringify(data));
    });
  }

  getWeekWeather(cityId: number) {
    this._api.get5Days(cityId).subscribe(data => {
      this.fiveDaysWeatherDataApi = data;
      this.fiveDaysWeatherData = [];
      for (let i = 0; i < 5; i++) {
        const element = this.fiveDaysWeatherDataApi.list[i];
        let date = new Date();
        date.setDate(date.getDate() + i + 1);
        this.fiveDaysWeatherData.push(
          new WeatherData(
            element.weather[0].id,
            element.main.feels_like,
            element.weather[0].main,
            0,
            0,
            date
          )
        );
      }
      console.log(JSON.stringify(this.fiveDaysWeatherData));
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
}
