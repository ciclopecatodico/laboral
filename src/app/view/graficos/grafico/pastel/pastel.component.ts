import { Component } from '@angular/core';
import { ChartOptions } from '../../../../model/charts/charts-options/chart-options';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-pastel',
  standalone: false,
  templateUrl: './pastel.component.html',
  styleUrl: './pastel.component.css'
})
export class PastelComponent {

  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
