import { BrowserModule } from "@angular/platform-browser";
import { NgModule, forwardRef } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ApiService } from "./services/api.service";
import { WeatherModule } from "./weather/weather.module";
import { HeaderComponent } from "./header/header.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    WeatherModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
