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
    new WeatherData(800, 12, "Sunny")
  );

  @Input() foundCity: CityData;
  @Input() set weatherData(value: WeatherData) {
    this._weatherData.next(value);
  }
  get weatherData() {
    return this._weatherData.getValue();
  }

  private iconList: WeatherIcon[] = icons;

  public imageUrl: string = "./assets/sun.svg";
  public weatherMain: string = "Sunny";
  public temp: string = "12";
  public city: string = "Mogadishu";

  constructor() {}

  ngOnInit() {
    this._weatherData.subscribe(data => {
      this.prepareData(data);
    });
  }

  prepareData(wData: WeatherData) {
    console.log("elo + " + JSON.stringify(wData));
    if (wData != null) {
      let id = this.weatherData.id;

      console.log("siema + " + JSON.stringify(wData));

      this.weatherMain = wData.main;
      this.temp = wData.feelsLike.toString();
      this.city = this.foundCity.name;

      console.log(this.weatherMain, this.temp, this.city);

      this.iconList.forEach(ico => {
        if (id >= ico.from && id <= ico.to) {
          this.imageUrl = "./assets/" + ico.fileName;
        }
      });

      if (id != 800)
        document.getElementById("current-ico").removeAttribute("class");
    }
  }
}
