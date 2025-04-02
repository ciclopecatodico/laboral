import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { CONST } from '../../../model/const/CONST';
import { Router } from '@angular/router';

@Component({
  selector: 'agno-form',
  standalone: false,
  templateUrl: './agno-form.component.html',
  styleUrl: './agno-form.component.css'
})
export class AgnoFormComponent {


  @Output()
  public peticionChange = new EventEmitter<Peticion>;

  private router : Router; 
  private peticion_: Peticion;
  public parametros: Parametros;


  constructor(configurationService: ConfigurationService,  router : Router) {
    this.router = router; 
    this.peticion_ = Object.create(Peticion); 
    this.parametros = configurationService.parametros[CONST.reforma2025.index];
  }


  public simularLaboral() {
    if(this.formularioValido()){
      this.peticionChange.emit(this.peticion_);
      console.log("peticionChange Emitido!!");
    }else{
      alert("Datos invalidos");
    }
  }

  public volver() {
      this.router.navigate(['paso-2']);
  }

  @Input()
  set peticion(peticion: Peticion) {
    this.peticion_ = peticion;
    //asigno a la petición el valor del salario del último parámetro utilizado 2025
    //this.peticion.salario = this.parametros.smlv;
  }

  get peticion() {
    return this.peticion_;
  }


  private formularioValido(): boolean {
    //console.log("Peticion:", JSON.stringify(this.peticion_))
    if (this.peticion_.sena) {
      return false;
    }
    if (this.peticion_.edad == undefined || this.peticion_.edad < 18) {
      return false;
    }
    if (this.peticion_.experiencia == undefined || this.peticion_.experiencia < 0) {
      return false;
    }
    if (this.peticion_.sexo == undefined) {
      return false;
    }
    //console.log("Peticion:", JSON.stringify(this.peticion_))
    return true;
  }

}
