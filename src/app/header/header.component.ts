import { Component, OnInit, ElementRef, HostListener } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"]
})
export class HeaderComponent implements OnInit {
  public faSearch = faSearch;
  private collapseHandler = false;
  private wasInside = false;

  constructor(private eRef: ElementRef) {}

  ngOnInit() {}

  inputClick() {
    this.collapseHandler = !this.collapseHandler;
    let e = document.getElementById("city-results");

    if (this.collapseHandler) {
      e.setAttribute("class", "results collapse-results visible");
    } else {
      e.setAttribute("class", "results hidden");
    }
    this.wasInside = true;
  }

  @HostListener("document:click")
  clickout() {
    if (!this.wasInside) {
      let e = document.getElementById("city-results");
      e.setAttribute("class", "results hidden");
    }
    this.wasInside = false;
    this.collapseHandler = false;
  }
}
