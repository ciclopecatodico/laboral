import { Component, Input } from '@angular/core';
import { Horas } from '../../model/horas/horas';

@Component({
  selector: 'app-simulacion',
  standalone: false,
  templateUrl: './simulacion.component.html',
  styleUrl: './simulacion.component.css'
})
export class SimulacionComponent {

  @Input()
  semana = Array<Horas>();

}
