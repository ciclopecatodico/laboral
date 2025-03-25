import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Horas } from '../../../model/horas/horas';
import { Peticion } from '../../../model/peticion/peticion.model';

@Component({
  selector: 'mes-simulacion',
  standalone: false,
  templateUrl: './mes-simulacion.component.html',
  styleUrl: './mes-simulacion.component.css'
})
export class MesSimulacionComponent {

  @Output()
  public peticionMesChange = new EventEmitter<Peticion>;

  public peticion_ : Peticion;



  public mes = new Array<Horas>();


  constructor(){
    this.peticion_ = new Peticion('', 1);
  }


  @Input()
  set peticion(peticion:Peticion){
    this.peticion_ = peticion;
  }

  get peticion(){
    return this.peticion_;
  }
}
