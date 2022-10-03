import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DataService } from './data.service';

@NgModule({
  imports: [BrowserModule, FormsModule, DragDropModule],
  declarations: [AppComponent, CalendarComponent],
  bootstrap: [AppComponent],
  providers: [DataService]
})
export class AppModule {}
