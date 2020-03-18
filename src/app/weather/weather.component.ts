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

  private subscriptions: any[] = [];

  public weatherDataApi: any = null;
  public weatherData: WeatherData;

  public fiveDaysWeatherDataApi: any = null;
  public fiveDaysWeatherData: WeatherData[] = null;

  private citiesList: CityData[] = cities;
  private geolocationData: any;
  public localCity: CityData = null;
  public localWeather: WeatherData = null;
  public local5DaysWeather: WeatherData[] = null;

  public foundCity: CityData;

  constructor(private _api: ApiService, private _data: DataService) {}

  ngOnInit() {
    this.getLocalWeather();

    let sub1 = this._data.searchData$.subscribe(city => {
      if (city && city.id != this.foundCity.id) {
        this.getWeather(city.id, false);
        this.getWeekWeather(city.id, false);
        this.foundCity = city;
      }
    });

    let sub2 = this._data.geolocateCheck$.subscribe(data => {
      if (data) {
        if (this.localCity == null || this.local5DaysWeather == null) {
          this.getLocalWeather();
        } else {
          this.foundCity = this.localCity;
          this.weatherData = this.localWeather;
          this.fiveDaysWeatherData = this.local5DaysWeather;
        }
        this._data.geolocateCheck = false;
      }
    });

    this.subscriptions.push(sub1);
    this.subscriptions.push(sub2);
  }

  getLocalWeather() {
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
        if (diff < 0.05) break;
        //approx difference inside a city like wroclaw
      }
      this.foundCity = cityPicker.cityData;
      this.localCity = cityPicker.cityData;

      this.getWeather(cityPicker.cityData.id, true);
      this.getWeekWeather(cityPicker.cityData.id, true);
    });
  }

  getWeather(cityId: number, isLocal: boolean) {
    let sub = this._api.getWeather(cityId).subscribe(data => {
      this.weatherDataApi = data;
      console.log(JSON.stringify(data));
      this.weatherData = new WeatherData(
        this.weatherDataApi.weather[0].id,
        (this.weatherDataApi.main.temp_max +
          this.weatherDataApi.main.temp_min) /
          2,
        this.weatherDataApi.weather[0].main,
        this.weatherDataApi.sys.sunrise,
        this.weatherDataApi.sys.sunset,
        new Date()
      );
      if (isLocal) this.localWeather = this.weatherData;
    });
    this.subscriptions.push(sub);
  }

  getWeekWeather(cityId: number, isLocal: boolean) {
    let sub = this._api.get5Days(cityId).subscribe(data => {
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
      if (isLocal) this.local5DaysWeather = this.fiveDaysWeatherData;
    });
    this.subscriptions.push(sub);
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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
