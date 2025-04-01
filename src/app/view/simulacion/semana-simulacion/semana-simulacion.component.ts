import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { Semana } from '../../../model/simulacion/agno copy/semana';

@Component({
  selector: 'semana-simulacion',
  standalone: false,
  templateUrl: './semana-simulacion.component.html',
  styleUrl: './semana-simulacion.component.css'
})
export class SemanaSimulacionComponent {

  @Input()
  public semana: Semana;

  @Input()
  public peticion: Peticion;

  @Output()
  public peticionSemanaChange = new EventEmitter<Peticion>;

  public verNotas = false;

  public reformas: Parametros[];
  public verGrafico = false;

  constructor(configurationService: ConfigurationService) {
    this.reformas = configurationService.parametros;
    this.peticion = new Peticion('', 1);
    this.semana = new Semana([], []);
  }


}
