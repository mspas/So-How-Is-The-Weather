import { Component, OnInit, Input } from "@angular/core";
import { CityData } from "src/app/models/city.model";
import {
  WeatherData,
  WeekWeatherViewData
} from "src/app/models/weather-data.model";
import { BehaviorSubject } from "rxjs";
import icons from "../../icons.list.json";
import { WeatherIcon } from "src/app/models/weather-icon.model.js";
import { DateNameService } from "src/app/services/DateNameService";

@Component({
  selector: "app-weather-week",
  templateUrl: "./weather-week.component.html",
  styleUrls: ["./weather-week.component.sass"]
})
export class WeatherWeekComponent implements OnInit {
  public defaultData: WeekWeatherViewData = new WeekWeatherViewData(
    800,
    10,
    "Sunny",
    "Jan 30",
    "Thu",
    "./assets/cloudy.svg"
  );

  private _fiveDaysWeatherData = new BehaviorSubject<WeatherData[]>([]);
  @Input() set fiveDaysWeatherData(value: WeatherData[]) {
    this.viewDataList = [];
    this._fiveDaysWeatherData.next(value);
  }
  get weatherData() {
    return this._fiveDaysWeatherData.getValue();
  }
  @Input() foundCity: CityData;

  private iconList: WeatherIcon[] = icons;
  public viewDataList: WeekWeatherViewData[] = [];

  constructor(private _date: DateNameService) {}

  ngOnInit() {
    this._fiveDaysWeatherData.subscribe(data => {
      this.prepareData(data);
    });
  }

  prepareData(wData: WeatherData[]) {
    if (wData != null) {
      wData.forEach(day => {
        let id = day.id;
        let date = new Date(day.date);

        let dateString =
          this._date.getMonthNameShort(date.getMonth()) +
          " " +
          date.getDate().toString();
        let dayString = this._date.getDayName(date.getDay());

        let element = new WeekWeatherViewData(
          day.id,
          Math.round(day.feelsLike),
          day.main,
          dateString,
          dayString,
          ""
        );

        this.iconList.forEach(ico => {
          if (id >= ico.from && id <= ico.to) {
            element.url = "./assets/" + ico.name + ico.ext;
          }
        });

        this.viewDataList.push(element);
      });
    }
  }

  ngOnDestroy() {
    this._fiveDaysWeatherData.unsubscribe();
  }
}
