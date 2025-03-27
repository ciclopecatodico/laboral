import { Component, Input } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { LiquidadorMesesService } from '../../../service/liquidador/liquidador-meses/liquidador-meses.service';

@Component({
  selector: 'horas-mes',
  standalone: false,
  templateUrl: './horas-mes.component.html',
  styleUrl: './horas-mes.component.css'
})
export class HorasMesComponent {

  @Input()
  semana = Array<HorasSemana>();



}
