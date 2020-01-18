import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.sass"]
})
export class WeatherComponent implements OnInit {
  imageUrl: string = "./assets/cloud.png";

  constructor() {}

  ngOnInit() {}
}
