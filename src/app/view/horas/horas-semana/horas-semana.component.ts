import { Component, Input } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { List } from '../../../model/listas/list';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';

@Component({
  selector: 'horas-semana',
  standalone: false,
  templateUrl: './horas-semana.component.html',
  styleUrl: './horas-semana.component.css'
})
export class HorasSemanaComponent {


  @Input()
  public semana = Array<HorasSemana>();

  public total1950 = Array<HorasSemana>();
  public total789 = Array<HorasSemana>();
  public total1846 = Array<HorasSemana>();
  public total2021 = Array<HorasSemana>();
  public total2025 = Array<HorasSemana>();

  public showReforma1950 = false;
  public showReforma789 = false;
  public showReforma1846 = false;
  public showReforma2101 = false;
  public showReforma2025 = false;

  public reforma1950 = CONST.reforma1950;
  public reforma789 = CONST.reforma789;
  public reforma1846 = CONST.reforma1846;
  public reforma2101 = CONST.reforma2101;
  public reforma2025 = CONST.reforma2025;

  public reformas: Parametros[];

  public titulos = ['/'];
  public tiposHoras = ['Día', 'Reforma', 'Horario', 'Diurnas', 'Nocturnas', 'Extra Diurnas', 'Extra Nocturnas', 'Total'];

  constructor(configurationService: ConfigurationService) {
    this.reformas = configurationService.parametros;
    this.initHeaders();
  }


  initHeaders() {
    const list = new List();
    list.dias.forEach(d => {
      if (d.label)
        this.titulos.push(d.label);
    });
  }


  toogle(reforma: string) {
    console.log()
    switch (reforma) {
      case "1950":
        this.showReforma1950 = !this.showReforma1950;
        break;
      case "789":
        this.showReforma789 = !this.showReforma789;
        break;
      case "1846":
        this.showReforma1846 = !this.showReforma1846;
        break;
      case "2101":
        this.showReforma2101 = !this.showReforma2101;
        break;
      case "2025":
        this.showReforma2025 = !this.showReforma2025;
        break;
    }
  }


  hidden(dia: HorasSemana) {
    if (dia.name === 'total') {
      return false;
    }
    let reforma = dia.reformaName;
    switch (reforma) {
      case "1950":
        return !this.showReforma1950;
      case "789":
        return !this.showReforma789;
      case "1846":
        return !this.showReforma1846;
      case "2101":
        return !this.showReforma2101;
      case "2025":
        return !this.showReforma2025;
    }
    return false;
  }
}
