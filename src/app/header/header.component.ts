import { Component, OnInit, HostListener } from "@angular/core";
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import cities from "../city.list.json";
import { CityData } from "../models/city.model";
import { DataService } from "../services/DataService";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"]
})
export class HeaderComponent implements OnInit {
  public faSearch = faSearch;
  public faMap = faMapMarkerAlt;

  private collapseHandler = false;
  private wasInside = false;
  public wasSearched = false;
  private citiesList: CityData[] = cities;
  private searchTab: CityData[];
  private searchValueLength = 0;

  constructor(private _data: DataService) {}

  ngOnInit() {
    this.searchTab = this.citiesList;
  }

  onInputClick() {
    this.collapseHandler = !this.collapseHandler;

    if (this.collapseHandler) {
      this.showResultList();
    } else {
      this.hideResultsList();
    }
    this.wasInside = true;
  }

  @HostListener("document:click")
  clickout() {
    if (!this.wasInside) {
      this.hideResultsList();
    }
    this.wasInside = false;
    this.collapseHandler = false;
  }

  showResultList() {
    document
      .getElementById("city-results")
      .setAttribute("class", "results collapse-results visible");
  }
  hideResultsList() {
    document
      .getElementById("city-results")
      .setAttribute("class", "results hidden");
  }

  inputSearchChange(searchValue: string) {
    if (searchValue.length > 0 && !this.collapseHandler) this.showResultList();
    if (searchValue.length > 2) {
      if (this.searchValueLength > searchValue.length)
        this.searchTab = this.citiesList;

      this.wasSearched = true;
      searchValue =
        searchValue[0].toUpperCase() + searchValue.slice(1, searchValue.length);

      let regex = new RegExp(searchValue + ".*");
      let tempTab = [];

      this.searchTab.forEach(city => {
        let match = city.name.match(regex);
        if (match) tempTab.push(city);
      });

      this.searchTab = tempTab;
    } else {
      this.searchTab = this.citiesList;
      this.wasSearched = false;
    }
    this.searchValueLength = searchValue.length;
  }

  onCityClick(city: CityData) {
    this._data.searchData = city;
  }

  onGeoLocateClick() {
    this._data.geolocateCheck = true;
  }
}
