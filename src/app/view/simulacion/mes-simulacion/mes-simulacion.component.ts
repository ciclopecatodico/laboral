import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { Peticion } from '../../../model/peticion/peticion.model';
import { ValorHoras } from '../../../model/liquidacion/valor-horas/valor-horas';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';

@Component({
  selector: 'mes-simulacion',
  standalone: false,
  templateUrl: './mes-simulacion.component.html',
  styleUrl: './mes-simulacion.component.css'
})
export class MesSimulacionComponent {


  @Input()
  public mes = Array<ValorHoras>();
  @Output()
  public peticionMesChange = new EventEmitter<Peticion>;
  public peticion_: Peticion;
  public parametros: Parametros[];
  public verNotas = false;
  public const = CONST;


  constructor(configurationService: ConfigurationService) {
    this.parametros = configurationService.parametros;
    this.peticion_ = new Peticion('', 1);
  }

  @Input()
  set peticion(peticion: Peticion) {
    this.peticion_ = peticion;
  }

  get peticion() {
    return this.peticion_;
  }

  get verMes() {
    return JSON.stringify(this.mes);
  }


}
