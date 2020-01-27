import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CityData } from "../models/city.model";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor() {}

  private _searchData = new BehaviorSubject<CityData>(
    new CityData(null, null, null, null)
  );

  /*currentSearchData = this.searchData.asObservable();

  changeSearchData(data: CityData) {
    this.searchData.next(data);
  }*/

  get searchData$(): Observable<CityData> {
    return this._searchData.asObservable();
  }

  set searchData(data: CityData) {
    console.log(JSON.stringify(data));
    this._searchData.next(data);
  }
}
