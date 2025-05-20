import { Component, Input } from '@angular/core';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';
import { CONST } from '../../../model/const/CONST';

@Component({
  selector: 'horas-agno',
  standalone: false,
  templateUrl: './horas-agno.component.html',
  styleUrl: './horas-agno.component.css'
})
export class HorasAgnoComponent {

  public showReforma1950 = false;
  public showReforma789 = false;
  public showReforma1846 = false;
  public showReforma2101 = false;
  public showReforma2025 = false;

  public hidden = [true, true, true, true, true];

  public total = false;

  public reforma1950 = CONST.reforma1950;
  public reforma789 = CONST.reforma789;
  public reforma1846 = CONST.reforma1846;
  public reforma2101 = CONST.reforma2101;
  public reforma2025 = CONST.reforma2025;

  @Input()
  meses = Array<ValorHoras>();

  public tiposHoras = ['Mes', 'Reforma', 'Diurnas', 'Extra Diurnas', 'Nocturnas', 'Extra Nocturnas', 'Diurna Dominical o Festivo', 'Diurna Extra Dominical o Festivo', 'Nocturna Dominical o Festivo', 'Nocturna Extra Dominical o Festivo', 'Totales'];

  constructor() {

  }


  toogle(reforma: string) {
    switch (reforma) {
      case "1950":
        this.showReforma1950 = !this.showReforma1950;
        this.hidden[0] = !this.hidden[0];
        break;
      case "789":
        this.showReforma789 = !this.showReforma789;
        this.hidden[1] = !this.hidden[1];
        break;
      case "1846":
        this.showReforma1846 = !this.showReforma1846;
        this.hidden[2] = !this.hidden[2];
        break;
      case "2101":
        this.showReforma2101 = !this.showReforma2101;
        this.hidden[3] = !this.hidden[3];
        break;
      case "2025":
        this.showReforma2025 = !this.showReforma2025;
        this.hidden[4] = !this.hidden[4];
        break;
    }
  }

  get verMes() {
    return JSON.stringify(this.meses);
  }
}
