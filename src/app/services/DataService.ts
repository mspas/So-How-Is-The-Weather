import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CityData } from "../models/city.model";
@Injectable()
export class DataService {
  constructor() {}
  private _searchData = new BehaviorSubject<CityData>(null);
  /*currentSearchData = this.searchData.asObservable();
 
  changeSearchData(data: CityData) {
    this.searchData.next(data);
  }*/
  get searchData$(): Observable<CityData> {
    return this._searchData.asObservable();
  }
  set searchData(data: CityData) {
    console.log(data);
    this._searchData.next(data);
  }
}
