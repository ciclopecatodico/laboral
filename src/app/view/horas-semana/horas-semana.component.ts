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

  public horasDiurnas = 0;
  public horasNocturnas = 0;
  public horasExtraDiurna = 0;
  public horasExtraNocturna = 0;
  public totalHoras = 0;


  public titulos = ['/'];
  public tiposHoras = ['Día', 'Reforma','Horario', 'Diurnas', 'Nocturnas', 'Extra Diurnas', 'Extra Nocturnas', 'Total'];

  constructor() {
    this.initHeaders();
    this.calcularTotales();
  }


  initHeaders() {
    const list = new List();
    list.dias.forEach(d => {
      if (d.label)
        this.titulos.push(d.label);
    });
  }

  calcularTotales(): boolean {
    this.horasDiurnas = 0;
    this.horasNocturnas = 0;
    this.horasExtraDiurna = 0;
    this.horasExtraNocturna = 0;
    this.totalHoras = 0;

    this.semana.forEach(dia => {
      this.horasDiurnas += dia.horasDiurnas;
      this.horasNocturnas += dia.horasNocturnas;
      this.horasExtraDiurna += dia.horasExtraDiurna;
      this.horasExtraNocturna += dia.horasExtraNocturna;
      this.totalHoras += dia.totalHoras;
    });
    return true;
  }

}
