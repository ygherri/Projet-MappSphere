import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history/history.component';
import { HistoryService } from '../../services/history.service';
import { WeatherService } from '../../services/WeatherService';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HistoryComponent],
  exports:[HistoryComponent],
  providers : [HistoryService, WeatherService]
})
export class PagesModule { }
