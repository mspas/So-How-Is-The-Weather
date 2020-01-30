export class WeatherData {
  constructor(
    public id: number,
    public feelsLike: number,
    public main: string,
    public sunrise: number,
    public sunset: number,
    public date: Date
  ) {}
}

export class WeekWeatherViewData {
  constructor(
    public id: number,
    public feelsLike: number,
    public main: string,
    public date: string,
    public day: string,
    public url: string
  ) {}
}
