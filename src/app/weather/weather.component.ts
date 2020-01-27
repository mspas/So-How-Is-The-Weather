import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import cities from "../city.list.json";
import { CityData } from "../models/city.model";
import { WeatherData } from "../models/weather-data.model";
import { DataService } from "../services/data.service";

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
  private searchData: CityData;

  constructor(private _api: ApiService, private _data: DataService) {}

  ngOnInit() {
    this._data.searchData$.subscribe(data => {
      console.log(data);
    });

    let cityPicker = {
      diff: this.MAX_VALUE,
      cityData: new CityData(-1, "x", "xy", { lon: 0, lat: 0 })
    };

    /*this.getLocation().then(location => {
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
          //approx diffe rence inside a city like wroclaw
          break;
        }
      }

      this._api.getWeather(cityPicker.cityData.id).subscribe(data => {
        this.weatherDataApi = data;
        this.weatherData = new WeatherData(
          this.weatherDataApi.weather[0].id,
          this.weatherDataApi.main.feels_like,
          this.weatherDataApi.weather[0].main
        );
        this.foundCity = cityPicker.cityData;
        console.log(JSON.stringify(data));
      });
    });*/
  }

  click() {
    this._data.searchData$.subscribe(data => {
      console.log("click", JSON.stringify(data));
      if (data.id != null) {
        //this.getWeather(data);
      }
    });
  }

  getWeather(city: CityData) {
    this._api.getWeather(city.id).subscribe(data => {
      this.weatherDataApi = data;
      this.weatherData = new WeatherData(
        this.weatherDataApi.weather[0].id,
        this.weatherDataApi.main.feels_like,
        this.weatherDataApi.weather[0].main
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
