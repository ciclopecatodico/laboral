import { Component, Input } from '@angular/core';
import { DonutChart } from '../../../model/charts/donut-chart/donut-chart-options';


@Component({
  selector: 'grafico-dona',
  standalone: false,
  templateUrl: './dona.component.html',
  styleUrl: './dona.component.css'
})
export class DonaComponent {

  @Input()
  public donas :DonutChart[] | undefined;

  constructor() {
    
  }

}
