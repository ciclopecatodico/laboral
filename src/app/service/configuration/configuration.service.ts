import { Injectable } from '@angular/core';
import { Parametros } from '../../model/modelos-simulacion/parametros/parametros';
import { Peticion } from '../../model/peticion/peticion.model';

import * as parametrosConf from  '../../../../public/publico/parametros/parametros.json';
import * as peticionesConf from '../../../../public/publico/parametros/peticiones.json';
import * as semanaConf from '../../../../public/publico/parametros/semana.json';
import * as agnoConf from '../../../../public/publico/parametros/agno.json';
import * as creditosConf from '../../../../public/publico/parametros/creditos.json';
import * as valorHorasConf from '../../../../public/publico/parametros/valorHoras.json';
import * as congresistasConf from '../../../../public/publico/parametros/congresistas.json';
import { HorasSemana } from '../../model/liquidacion/horas-semana/horas-semana';
import { AgnoModel } from '../../model/modelos-simulacion/agno-model/agno-model';
import { Credito } from '../../model/credito/credito';
import { ValorHoras } from '../../model/liquidacion/valor-horas/valor-horas';
import { Config } from '../../model/config/config';


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


  get congresistas(): Array<Config>{
    return(congresistasConf as any).default;
  }

}
