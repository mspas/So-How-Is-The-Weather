import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CityData } from "../models/city.model";
@Injectable()
export class DataService {
  constructor() {}
  private _searchData = new BehaviorSubject<CityData>(null);
  private _geolocateCheck = new BehaviorSubject<boolean>(false);

  get searchData$(): Observable<CityData> {
    return this._searchData.asObservable();
  }
  set searchData(data: CityData) {
    this._searchData.next(data);
  }

  get geolocateCheck$(): Observable<boolean> {
    return this._geolocateCheck.asObservable();
  }
  set geolocateCheck(data: boolean) {
    this._geolocateCheck.next(data);
  }
}
