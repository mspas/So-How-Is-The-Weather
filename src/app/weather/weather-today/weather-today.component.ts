import { Component, OnInit, Input } from "@angular/core";
import { CityData } from "src/app/models/city.model";

@Component({
  selector: "app-weather-today",
  templateUrl: "./weather-today.component.html",
  styleUrls: ["./weather-today.component.sass"]
})
export class WeatherTodayComponent implements OnInit {
  @Input() weatherData: any;
  @Input() foundCity: CityData;

  private imageUrl: string = "./assets/cloud.png";

  constructor() {}

  ngOnInit() {}
}
