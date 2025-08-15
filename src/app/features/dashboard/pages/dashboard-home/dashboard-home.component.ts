import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService, DashboardStats } from '../../../../../app/core/services/dashboard.service';


@Component({
  selector: 'app-dashboard-home',
  standalone: false,
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})

export class DashboardHomeComponent {
  stats$!: Observable<DashboardStats>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.stats$ = this.dashboardService.getStats();
  }

}
