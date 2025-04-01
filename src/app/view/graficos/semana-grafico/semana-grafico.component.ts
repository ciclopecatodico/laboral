import { Component, Input, ViewChild } from '@angular/core';
import { ChartOptions } from '../../../model/charts/charts-options/chart-options';


@Component({
  selector: 'semana-grafico',
  standalone: false,
  templateUrl: './semana-grafico.component.html',
  styleUrl: './semana-grafico.component.css'
})
export class SemanaGraficoComponent {

  @Input()
  public charts = new Array<ChartOptions>();

  constructor() {
    
  }

}
