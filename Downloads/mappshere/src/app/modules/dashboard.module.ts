import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from '../../dashboard/dashboard.component';
@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
