export class CityData {
  constructor(
    public id: number,
    public name: string,
    public country: string,
    public coord: { lon: number; lat: number }
  ) {}
}
