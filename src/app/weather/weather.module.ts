import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WeatherComponent } from "./weather.component";
import { WeatherTodayComponent } from "./weather-today/weather-today.component";
import { WeatherWeekComponent } from "./weather-week/weather-week.component";

@NgModule({
  declarations: [WeatherComponent, WeatherTodayComponent, WeatherWeekComponent],
  imports: [CommonModule],
  exports: [WeatherComponent]
})
export class WeatherModule {}
