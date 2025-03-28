import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';

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

  @Input()
  public mes = Array<ValorHoras>();

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

  get verMes(){
    return JSON.stringify(this.mes); 
  }
}
