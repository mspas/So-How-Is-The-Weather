export class WeatherData {
  constructor(
    public id: number,
    public feelsLike: number,
    public main: string,
    public sunrise: number,
    public sunset: number
  ) {}
}
