import { Component, Input } from '@angular/core';
import { Horas } from '../../model/horas/horas';
import { List } from '../../model/listas/list';
import { ConfigurationService } from '../../service/configuration/configuration.service';
import { CONST } from '../../model/conf/conf';

@Component({
  selector: 'horas-semana',
  standalone: false,
  templateUrl: './horas-semana.component.html',
  styleUrl: './horas-semana.component.css'
})
export class HorasSemanaComponent {


  @Input()
  public semana = Array<Horas>();

  public total1950 = Array<Horas>();
  public total789 = Array<Horas>();
  public total2025 = Array<Horas>();

  public showReforma1950 = false;
  public showReforma789 = false;
  public showReforma2025 = false;

  public reforma1950 = CONST.reforma1950;
  public reforma789 = CONST.reforma789;
  public reforma2025 = CONST.reforma2025;


  public titulos = ['/'];
  public tiposHoras = ['Día', 'Reforma', 'Horario', 'Diurnas', 'Nocturnas', 'Extra Diurnas', 'Extra Nocturnas', 'Total'];

  constructor() {
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


  hidden(dia: Horas) {
    //console.log("Reforma:", reforma);
    if(dia.name === 'total'){
      return false;
    }
    let reforma = dia.reforma;
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
