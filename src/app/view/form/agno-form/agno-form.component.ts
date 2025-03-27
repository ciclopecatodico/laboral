import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';

@Component({
  selector: 'app-agno-form',
  standalone: false,
  templateUrl: './agno-form.component.html',
  styleUrl: './agno-form.component.css'
})
export class AgnoFormComponent {

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
