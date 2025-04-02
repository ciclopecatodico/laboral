import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { Laboral } from '../../../model/simulacion/laboral/laboral';
import { CONST } from '../../../model/const/CONST';
import { Router } from '@angular/router';

@Component({
  selector: 'laboral-simulacion',
  standalone: false,
  templateUrl: './laboral-simulacion.component.html',
  styleUrl: './laboral-simulacion.component.css'
})
export class LaboralSimulacionComponent {

  @Output()
  public peticionMesChange = new EventEmitter<Peticion>;
  public peticion_: Peticion;
  public verNotas = false;
  public const = CONST;

  private router : Router;

  @Input()
  public laboral = new Laboral(0,0,0,[]);

  constructor(router : Router) {
    this.router = router;
    this.peticion_ = Object.create(Peticion);
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
    this.router.navigate(['paso-3']);
  }
}
