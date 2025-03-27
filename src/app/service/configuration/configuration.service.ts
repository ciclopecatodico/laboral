import { Injectable } from '@angular/core';
import { Parametros } from '../../model/modelos-simulacion/parametros/parametros';
import { Peticion } from '../../model/peticion/peticion.model';

import * as parametrosConf from '../../../assets/json/parametros.json';
import * as peticionesConf from '../../../assets/json/peticiones.json';
import * as semanaConf from '../../../assets/json/semana.json';
import * as agnoConf from '../../../assets/json/agno.json';
import { HorasSemana } from '../../model/liquidacion/horas-semana/horas-semana';
import { AgnoModel } from '../../model/modelos-simulacion/agno-model/agno-model';



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
    return (agnoConf as any).default;
  }

}
