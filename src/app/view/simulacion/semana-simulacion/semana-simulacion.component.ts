import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { Peticion } from '../../../model/peticion/peticion.model';
import { LiquidadorMesesService } from '../../../service/liquidador/liquidador-meses/liquidador-meses.service';

@Component({
  selector: 'semana-simulacion',
  standalone: false,
  templateUrl: './semana-simulacion.component.html',
  styleUrl: './semana-simulacion.component.css'
})
export class SemanaSimulacionComponent {


  @Input()
  public semana = Array<HorasSemana>();

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
