import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';

@Component({
  selector: 'agno-simulacion',
  standalone: false,
  templateUrl: './agno-simulacion.component.html',
  styleUrl: './agno-simulacion.component.css'
})
export class AgnoSimulacionComponent {

  @Output()
  public peticionMesChange = new EventEmitter<Peticion>;
  public peticion_: Peticion;
  public verNotas = false;

  @Output()
  public volverChange = new EventEmitter<string>;

  @Input()
  public laboral = Array<ValorHoras>();

  constructor() {
    this.peticion_ = new Peticion('', 1);
  }

  @Input()
  set peticion(peticion: Peticion) {
    this.peticion_ = peticion;
  }

  get peticion() {
    return this.peticion_;
  }

  get verAgno() {
    return JSON.stringify(this.laboral);
  }

  public volver(){
    this.volverChange.emit('agno');
  }

}
