import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Horas } from '../../../model/horas/horas';
import { Peticion } from '../../../model/peticion/peticion.model';
import { LiquidadorMesService } from '../../../service/liquidador/liquidador-mes/liquidador-mes.service';

@Component({
  selector: 'semana-simulacion',
  standalone: false,
  templateUrl: './semana-simulacion.component.html',
  styleUrl: './semana-simulacion.component.css'
})
export class SemanaSimulacionComponent {


  @Input()
  public semana = Array<Horas>();

  @Output()
  public peticionSemanaChange = new EventEmitter<Peticion>;

  public peticion_ : Peticion;

  constructor(){
    this.peticion_ = new Peticion('', 1);
  }

  simularMes(peticion: Peticion){
    console.log("Peticion Sena: ", JSON.stringify(peticion));
  }

  @Input()
  set peticion(peticion:Peticion){
    this.peticion_ = peticion;
  }

  get peticion(){
    return this.peticion_;
  }

}
