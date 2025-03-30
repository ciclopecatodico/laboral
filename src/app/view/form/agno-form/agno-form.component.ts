import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { CONST } from '../../../model/const/CONST';

@Component({
  selector: 'agno-form',
  standalone: false,
  templateUrl: './agno-form.component.html',
  styleUrl: './agno-form.component.css'
})
export class AgnoFormComponent {


  @Output()
  public peticionSemanaChange = new EventEmitter<Peticion>;

  @Output()
  public volverChange = new EventEmitter<string>;
  public peticion_: Peticion;

  public parametros: Parametros;


  constructor(configurationService: ConfigurationService) {
    this.peticion_ = new Peticion('', 1);
    this.parametros = configurationService.parametros[CONST.reforma2025.index];
  }


  public calcularAgnos() {
    this.peticionSemanaChange.emit(this.peticion_);
  }

  public volver() {
    this.volverChange.emit('semana');
  }

  @Input()
  set peticion(peticion: Peticion) {
    this.peticion_ = peticion;
    //asigno a la petición el valor del salario del último parámetro utilizado 2025
    this.peticion.salario = this.parametros.smlv;
  }

  get peticion() {
    return this.peticion_;
  }


  get formularioValido(): boolean {
    if (this.peticion_.sena) {
      return false;
    }
    if (this.peticion_.edad == undefined || this.peticion_.edad < 18) {
      return false;
    }
    if (this.peticion_.sexo == undefined) {
      return false;
    }
    return true;
  }

}
