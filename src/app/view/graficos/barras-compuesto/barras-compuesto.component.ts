import { Component, Input } from '@angular/core';
import { BarChartCompuesto } from '../../../model/charts/bars-chart/bars-chart-compuesto';


@Component({
  selector: 'grafico-barras-compuesto',
  standalone: false,
  templateUrl: './barras-compuesto.component.html',
  styleUrl: './barras-compuesto.component.css'
})
export class BarrasCompuestoComponent {

  @Input()
  public charts = new Array<BarChartCompuesto>();

  constructor() {
    
  }

}
