import { Component, Input } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { LiquidadorMesesService } from '../../../service/liquidador/liquidador-meses/liquidador-meses.service';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';
import { CONST } from '../../../model/const/CONST';

@Component({
  selector: 'horas-mes',
  standalone: false,
  templateUrl: './horas-mes.component.html',
  styleUrl: './horas-mes.component.css'
})
export class HorasMesComponent {



  public showReforma1950 = false;
  public showReforma789 = false;
  public showReforma2025 = false;

  public reforma1950 = CONST.reforma1950;
  public reforma789 = CONST.reforma789;
  public reforma2025 = CONST.reforma2025;

  @Input()
  meses = Array<ValorHoras>();


  public tiposHoras = ['Día', 'Reforma', 'Diurnas', 'Extra Diurnas', 'Nocturnas', 'Extra Nocturnas', 'Diurna Dominical o Festivo', 'Diurna Extra Dominical o Festivo', 'Nocturna Dominical o Festivo', 'Nocturna Extra Dominical o Festivo', 'Totales'];


  toogle(reforma: string) {
    switch (reforma) {
      case "1950":
        this.showReforma1950 = !this.showReforma1950;
        break;
      case "789":
        this.showReforma789 = !this.showReforma789;
        break;
      case "2025":
        this.showReforma2025 = !this.showReforma2025;
        break;
    }
  }

  hidden(mes: ValorHoras) {
    if (mes.name === 'total') {
      return false;
    }
    let reforma = mes.reformaName;
    switch (reforma) {
      case "1950":
        return !this.showReforma1950;

      case "789":
        return !this.showReforma789;

      case "2025":
        return !this.showReforma2025;
    }
    return false;
  }
}
