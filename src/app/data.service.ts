import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class DataService {
  testData: any[] = [];

  constructor() {
    const { year, monthIndex } = this.getCurrent();
    let year1 = year;
    let monthIndex1 = monthIndex - 1;

    let year2 = year;
    let monthIndex2 = monthIndex + 1;

    if (monthIndex === 0) {
      year1 = year - 1;
      monthIndex1 = 11;
    }

    if (monthIndex === 11) {
      year2 = year + 1;
      monthIndex2 = 0;
    }

    this.testData = [
      {
        title: 'eat',
        date: new Date(year1, monthIndex1, 15)
      },
      {
        title: 'sleep',
        date: new Date(year, monthIndex + 0, 10)
      },
      {
        title: 'run',
        date: new Date(year, monthIndex + 0, 15)
      },
      {
        title: 'play',
        date: new Date(year, monthIndex + 0, 15)
      },
      {
        title: 'cook',
        date: new Date(year, monthIndex + 0, 12)
      },
      {
        title: 'doom',
        date: new Date(year2, monthIndex2, 20)
      },
      {
        title: 'nioh 2',
        date: new Date(year2, monthIndex2, 13)
      },
      {
        title: 'Horizon',
        date: new Date(year2, monthIndex2, 13)
      }
    ];
  }

  getCurrent(): { year: number; monthIndex: number } {
    const currentDate = new Date();
    // const currentDate = new Date(2020, 11, 1); // last month
    // const currentDate = new Date(2020, 0, 1); // first month

    return {
      year: currentDate.getFullYear(),
      monthIndex: currentDate.getMonth()
    };
  }

  getSchedulesFor(year: number, month: number): Observable<any[]> {
    return of(this.testData).pipe(
      filter(arr => {
        return arr.filter(
          x => x.date.getFullYear() === year && x.date.getMonth() === month
        );
      })
    );
  }
}
