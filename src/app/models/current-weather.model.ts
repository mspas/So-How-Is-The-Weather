export class CurrentWeatherData {
  constructor(
    public temp: number,
    public tempFeels: number,
    public pressure: number,
    public humidity: number,
    public clouds: number
  ) {}
}
