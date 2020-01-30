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
  private citiesList: CityData[] = cities;
  private geolocationData: any;
  public foundCity: CityData;
  private searchCity: CityData;
  private cityId: number = -1;

  constructor(
    private _api: ApiService,
    private _data: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._data.searchData$.subscribe(city => {
      console.log(city);
      if (city && city.id != this.foundCity.id) {
        this.getWeather(city);
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

      this.getWeather(cityPicker.cityData);
    });
  }

  getWeather(city: CityData) {
    this._api.getWeather(city.id).subscribe(data => {
      this.weatherDataApi = data;
      this.weatherData = new WeatherData(
        this.weatherDataApi.weather[0].id,
        this.weatherDataApi.main.feels_like,
        this.weatherDataApi.weather[0].main,
        this.weatherDataApi.sys.sunrise,
        this.weatherDataApi.sys.sunset
      );
      this.foundCity = city;
      console.log(JSON.stringify(data));
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
