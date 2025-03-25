import { Component, Input } from '@angular/core';
import { Horas } from '../../../model/horas/horas';
import { LiquidadorMesService } from '../../../service/liquidador/liquidador-mes/liquidador-mes.service';

@Component({
  selector: 'horas-mes',
  standalone: false,
  templateUrl: './horas-mes.component.html',
  styleUrl: './horas-mes.component.css'
})
export class HorasMesComponent {

  @Input()
  semana = Array<Horas>();



}
