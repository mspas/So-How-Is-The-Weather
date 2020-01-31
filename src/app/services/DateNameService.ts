import { Injectable } from "@angular/core";

@Injectable()
export class DateNameService {
  private monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  private dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  getMonthName(i: number) {
    return this.monthNames[i];
  }
  getDayName(i: number) {
    return this.dayNames[i];
  }
  getMonthNameShort(i: number) {
    return this.monthNames[i].slice(0, 3);
  }
  getDayNameShort(i: number) {
    return this.dayNames[i].slice(0, 3);
  }
}
