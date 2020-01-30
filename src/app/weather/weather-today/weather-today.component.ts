import { Component, OnInit, Input } from "@angular/core";
import { CityData } from "src/app/models/city.model";
import icons from "../../icons.list.json";
import { WeatherIcon } from "src/app/models/weather-icon.model.js";
import { WeatherData } from "src/app/models/weather-data.model.js";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-weather-today",
  templateUrl: "./weather-today.component.html",
  styleUrls: ["./weather-today.component.sass"]
})
export class WeatherTodayComponent implements OnInit {
  private _weatherData = new BehaviorSubject<WeatherData>(
    new WeatherData(800, 12, "Sunny", 0, 1)
  );

  @Input() foundCity: CityData;
  @Input() set weatherData(value: WeatherData) {
    this._weatherData.next(value);
  }
  get weatherData() {
    return this._weatherData.getValue();
  }

  private iconList: WeatherIcon[] = icons;

  public imageUrl: string = "./assets/rain.svg";
  public viewData = {
    main: "Sunny",
    temp: "12",
    city: "Wrocław",
    country: "PL"
  };

  constructor() {}

  ngOnInit() {
    this._weatherData.subscribe(data => {
      this.prepareData(data);
    });
  }

  prepareData(wData: WeatherData) {
    let isNight = false;
    let now = Math.floor(Date.now() / 1000);
    console.log(now);

    if (wData != null) {
      let id = this.weatherData.id;

      if (now < this.weatherData.sunrise || now > this.weatherData.sunset)
        isNight = true;

      this.viewData = {
        main: wData.main,
        temp: Math.round(wData.feelsLike).toString(),
        city: this.foundCity.name,
        country: this.foundCity.country
      };

      this.iconList.forEach(ico => {
        if (id >= ico.from && id <= ico.to) {
          this.imageUrl = "./assets/" + ico.name + ico.ext;
          if (isNight && id == 800) {
            this.imageUrl = "./assets/moon.svg";
            this.setNightStyle("night");
          } else this.setStyle(ico.name, isNight);
        }
      });
    }
  }

  setStyle(className: string, isNight: boolean) {
    if (isNight) this.setNightStyle(className);
    else {
      document.getElementById("app").setAttribute("class", className);
      document.getElementById("current-ico").setAttribute("class", className);
    }
  }

  setNightStyle(className: string) {
    document.getElementById("app").setAttribute("class", "night");
    document.getElementById("current-ico").setAttribute("class", className);
  }
}
