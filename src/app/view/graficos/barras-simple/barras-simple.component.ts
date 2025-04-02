import { Component, Input } from '@angular/core';
import { BarChartSimple } from '../../../model/charts/bars-chart/bars-chart-simple';
import { GraficoService } from '../../../service/grafico/grafico.service';


@Component({
  selector: 'grafico-barras-simple',
  standalone: false,
  templateUrl: './barras-simple.component.html',
  styleUrl: './barras-simple.component.css'
})
export class BarrasSimpleComponent {

  public barras_: BarChartSimple;

  constructor(graficoService: GraficoService) {
    this.barras_ = graficoService.barrasSimple('', '', []);
  }


  @Input()
  set barras(barras: BarChartSimple | undefined) {
    if (barras != undefined) {
      this.barras_ = barras;
    }
  }

  get barras(): BarChartSimple {
    return this.barras_;
  }

}
