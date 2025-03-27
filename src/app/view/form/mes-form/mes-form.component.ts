import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';

@Component({
  selector: 'mes-form',
  standalone: false,
  templateUrl: './mes-form.component.html',
  styleUrl: './mes-form.component.css'
})
export class MesFormComponent {


  @Output()
  public peticionSemanaChange = new EventEmitter<Peticion>;
  public peticion_: Peticion;


  constructor() {
    this.peticion_ = new Peticion('', 1);
  }


  public calcularMes(){
    this.peticionSemanaChange.emit(this.peticion_);
  }

  @Input()
  set peticion(peticion: Peticion) {
    this.peticion_ = peticion;
  }

  get peticion() {
    return this.peticion_;
  }

}
