import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { CONST } from '../../../model/const/CONST';
import { Router } from '@angular/router';

@Component({
  selector: 'mes-form',
  standalone: false,
  templateUrl: './mes-form.component.html',
  styleUrl: './mes-form.component.css'
})
export class MesFormComponent {


  @Output()
  public peticionChange = new EventEmitter<Peticion>;

  private router: Router;
  public peticion_: Peticion;
  public parametros: Parametros;
  public income = Number("0x2FEFD8");

  private error ="";

  constructor(configurationService: ConfigurationService, router: Router) {
    this.router = router;
    this.peticion_ = new Peticion('', 1);
    this.parametros = configurationService.parametros[CONST.reforma2025.index];
  }


  public simularAgno() {
    if (this.formularioValido()) {
      this.peticionChange.emit(this.peticion_);
    } else {
      alert(this.error);
    }
  }

  public volver() {
    this.router.navigate(['paso-1']);
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


  private formularioValido(): boolean {
    if (this.peticion_.sena) {
      if (!this.peticion_.etapa) {
        this.error=CONST.formularioErrorMsg.mes.senaEtapa;
        return false;
      }
      //si es del sena debe poner una duración en la práctica
      if (this.peticion.duracion == undefined || this.peticion.duracion < 1) {
        this.error=CONST.formularioErrorMsg.mes.senaDuracion;
        return false;
      }
    } else {
      this.peticion_.sena = false; 
      if (this.peticion_.salario < this.parametros.smlv) {
        this.error=CONST.formularioErrorMsg.mes.salario;
        return false;
      }
    }
    return true;
  }

  public atob(msg : string){
    return atob(msg);
  }
  
}
