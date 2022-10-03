import { Component, OnInit, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { DataService } from '../data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private localDate: Date;
  weekDayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  weeksCount: number;
  weeks: any[] = [];

  @Input()
  set date(date: Date) {
    this.localDate = date;

    const year = this.localDate.getFullYear();
    const month = this.localDate.getMonth();
    const day = 1;

    const dayOfTheWeek = new Date(year, month, day).getDay();
    this.weeksCount = this.getWeeksCount(this.localDate);

    for (let i = 0; i < this.weeksCount; ++i) {
      this.weeks.push([{}, {}, {}, {}, {}, {}, {}]);
    }

    this.dataService.getSchedulesFor(year, month).subscribe(schedules => {
      this.fillDaysWithSchedules(dayOfTheWeek, schedules);
    });
  }

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  showData() {
    console.log(JSON.stringify(this.weeks, null, 2));
  }

  private getSchedulesForDay(schedules: any[], currentDate: Date): any[] {
    return schedules
      .filter(x => this.isSameDate(x.date, currentDate))
      .map(x => {
        const tmp = { ...x };
        delete tmp.date;
        return tmp;
      });
  }

  private fillDaysWithSchedules(firstDayOfTheMonth: number, schedules: any[]) {
    const year = this.localDate.getFullYear();
    const month = this.localDate.getMonth();
    let day = 1;

    for (let week = 0; week < this.weeksCount; ++week) {
      let weekDay = week === 0 ? firstDayOfTheMonth : 0;
      for (; weekDay < this.weekDayNames.length; ++weekDay) {
        const currentDate = new Date(Date.UTC(year, month, day));
        this.weeks[week][weekDay] = {
          date: currentDate,
          day,
          weekDay: this.weekDayNames[weekDay],
          schedules: this.getSchedulesForDay(schedules, currentDate)
        };

        ++day;
        if (new Date(year, month, day).getMonth() !== month) {
          return;
        }
      }
    }
  }

  private isSameDate(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  private getWeeksCount(date: Date): number {
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const daysCount = first.getDay() + last.getDate();
    const weeksCount = Math.ceil(daysCount / 7);

    return weeksCount;
  }
}
