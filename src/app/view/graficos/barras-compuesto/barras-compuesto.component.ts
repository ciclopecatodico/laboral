import { Component, Input } from '@angular/core';
import { BarChartCompuesto } from '../../../model/charts/bars-chart/bars-chart-compuesto';
import { GraficoService } from '../../../service/grafico/grafico.service';


@Component({
  selector: 'grafico-barras-compuesto',
  standalone: false,
  templateUrl: './barras-compuesto.component.html',
  styleUrl: './barras-compuesto.component.css'
})
export class BarrasCompuestoComponent {


  public barras_: BarChartCompuesto;


  constructor(graficoService: GraficoService) {
    this.barras_ = graficoService.barrasCompuesto('', '', [], [], '', false);
  }


  @Input()
  set barras(barras: BarChartCompuesto | undefined) {
    if (barras != undefined) {
      this.barras_ = barras;
    }
  }

  get barras(): BarChartCompuesto {
    return this.barras_;
  }
}
