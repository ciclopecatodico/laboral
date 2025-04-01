import { Component, Input } from '@angular/core';
import { BarChartSimple } from '../../../model/charts/bars-chart/bars-chart-simple';


@Component({
  selector: 'grafico-barras-simple',
  standalone: false,
  templateUrl: './barras-simple.component.html',
  styleUrl: './barras-simple.component.css'
})
export class BarrasSimpleComponent {

  @Input()
  public charts = new Array<BarChartSimple>();

  constructor() {
    
  }

}
