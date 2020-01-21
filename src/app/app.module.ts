import { BrowserModule } from "@angular/platform-browser";
import { NgModule, forwardRef } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ApiService } from "./services/api.service";
import { WeatherModule } from "./weather/weather.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, WeatherModule],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
