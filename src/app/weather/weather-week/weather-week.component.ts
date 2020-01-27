import { Component, OnInit, Input } from "@angular/core";
import { CityData } from "src/app/models/city.model";

@Component({
  selector: "app-weather-week",
  templateUrl: "./weather-week.component.html",
  styleUrls: ["./weather-week.component.sass"]
})
export class WeatherWeekComponent implements OnInit {
  @Input() weatherData: any;
  @Input() foundCity: CityData;

  private imageUrl: string = "./assets/cloud.svg";

  constructor() {}

  ngOnInit() {}
}
