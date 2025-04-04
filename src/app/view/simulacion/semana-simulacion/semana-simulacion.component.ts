import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { Parametros } from '../../../model/modelos-simulacion/parametros/parametros';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { Semana } from '../../../model/simulacion/semana/semana';
import { CONST } from '../../../model/const/CONST';

@Component({
  selector: 'semana-simulacion',
  standalone: false,
  templateUrl: './semana-simulacion.component.html',
  styleUrl: './semana-simulacion.component.css'
})
export class SemanaSimulacionComponent implements OnInit {

  @Input()
  public semana: Semana;

  @Input()
  public peticion: Peticion;

  private configurationService: ConfigurationService;
  public verNotas = false;
  public const = CONST;
  public parametros: Parametros[];
  public verGrafico = false;

  constructor(configurationService: ConfigurationService) {
    this.configurationService = configurationService;
    this.parametros = configurationService.parametros;
    this.peticion = Object.create(Peticion);
    this.semana = Object.create(Semana);
  }

  ngOnInit(): void {
    this.peticion.salario = this.configurationService.parametros[0].smlv;
  }

}
