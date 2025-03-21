import { Component, Input } from '@angular/core';
import { Dia } from '../../model/dia/dia';
import { CONST } from '../../model/conf/conf';
import { List } from '../../model/listas/list';

@Component({
  selector: 'horas-semana',
  standalone: false,
  templateUrl: './horas-semana.component.html',
  styleUrl: './horas-semana.component.css'
})
export class HorasSemanaComponent {


  @Input()
  semana = Array<Dia>();

  public titulos = ['/'];
  public tiposHoras = ['Día', 'Horario', 'Diurnas', 'Nocturnas', 'Extra Diurnas', 'Extra Nocturnas', 'Total'];

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

}
