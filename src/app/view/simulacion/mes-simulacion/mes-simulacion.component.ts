import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Mes } from '../../../model/simulacion/mes/mes';

@Component({
  selector: 'mes-simulacion',
  standalone: false,
  templateUrl: './mes-simulacion.component.html',
  styleUrl: './mes-simulacion.component.css'
})
export class MesSimulacionComponent {

  @Input()
  public mes : Mes;

  @Output()
  public peticionMesChange = new EventEmitter<Peticion>;

  public peticion_ : Peticion;
  public parametros: Parametros[];
  public verNotas = false;
  public const = CONST;

  constructor(configurationService: ConfigurationService) {
    this.parametros = configurationService.parametros;
    this.peticion_ = Object.create(Peticion);
    this.mes = Object.create(Mes);
  }

  @Input()
  set peticion(peticion: Peticion) {
    this.peticion_ = peticion;
    //this.calcularParametros();
  }

  //calcula el valor de la hora para el salario ingresado en la petición
  private calcularParametros() {
    this.parametros.forEach(p => {
      p.smlvHora = this.peticion.salario / p.jornadaLaboralMensual;
    });
  }

  get peticion() {
    return this.peticion_;
  }

  get verMes() {
    return JSON.stringify(this.mes);
  }



}
