import { Component, Input } from '@angular/core';
import { Dia } from '../../model/dia/dia';

@Component({
  selector: 'app-simulacion',
  standalone: false,
  templateUrl: './simulacion.component.html',
  styleUrl: './simulacion.component.css'
})
export class SimulacionComponent {

  @Input()
  semana = Array<Dia>();

}
