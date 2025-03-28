import { Injectable } from '@angular/core';
import { Parametros } from '../../model/modelos-simulacion/parametros/parametros';
import { Peticion } from '../../model/peticion/peticion.model';

import * as parametrosConf from '../../../assets/json/parametros.json';
import * as peticionesConf from '../../../assets/json/peticiones.json';
import * as semanaConf from '../../../assets/json/semana.json';
import * as agnoConf from '../../../assets/json/agno.json';
import * as creditosConf from '../../../assets/json/creditos.json';
import * as valorHorasConf from '../../../assets/json/valorHoras.json';
import { HorasSemana } from '../../model/liquidacion/horas-semana/horas-semana';
import { AgnoModel } from '../../model/modelos-simulacion/agno-model/agno-model';
import { Credito } from '../../model/credito/credito';
import { ValorHoras } from '../../model/liquidacion/valor-horas/valor-horas';




@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  get parametros(): Array<Parametros> {
    return (parametrosConf as any).default;
  }

  get peticiones(): Array<Peticion> {
    return (peticionesConf as any).default;
  }

  get semana(): Array<HorasSemana> {
    return (semanaConf as any).default;
  }

  get agnoModel(): AgnoModel {
    return (agnoConf as any).default[0];
  }

  get creditos(): Array<Credito> {
    return (creditosConf as any).default;
  }

  /**
   * Inicializa un objeto de valor horas a ceros 
   */
  get valorHoras(): ValorHoras {
    return (valorHorasConf as any).default[0];
  }


}
