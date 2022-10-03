import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dates = [];

  constructor(private date: DataService) {}

  ngOnInit() {
    this.initCalendarDates();
  }

  private initCalendarDates() {
    const { year, monthIndex } = this.date.getCurrent();

    if (monthIndex === 0) {
      // first month January
      this.dates = [
        new Date(year - 1, 11),
        new Date(year, monthIndex),
        new Date(year, monthIndex + 1)
      ];

      return;
    }

    if (monthIndex === 11) {
      // last month December
      this.dates = [
        new Date(year, monthIndex - 1),
        new Date(year, monthIndex),
        new Date(year + 1, 0)
      ];

      return;
    }

    this.dates = [
      new Date(year, monthIndex - 1),
      new Date(year, monthIndex),
      new Date(year, monthIndex + 1)
    ];
  }
}
