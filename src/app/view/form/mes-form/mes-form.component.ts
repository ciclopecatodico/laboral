import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { CONST } from '../../../model/const/CONST';

@Component({
  selector: 'mes-form',
  standalone: false,
  templateUrl: './mes-form.component.html',
  styleUrl: './mes-form.component.css'
})
export class MesFormComponent {


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


  public calcularMes() {
    this.peticionSemanaChange.emit(this.peticion_);
  }

  public volver(){
    this.volverChange.emit('inicial');
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
      if (!this.peticion_.etapa) {
        return false;
      }
      //si es del sena debe poner una duración en la práctica
      if(this.peticion.duracion == undefined || this.peticion.duracion < 1){
        return false; 
      }
    } else {
      if (this.peticion_.salario < this.parametros.smlv){
        return  false;
      }
    }
    return true; 
  }

}
