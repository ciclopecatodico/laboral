import { Injectable } from '@angular/core';
import { Parametros } from '../../model/parametros/parametros';
import { Peticion } from '../../model/peticion/peticion.model';

import * as parametrosConf from '../../../assets/json/parametros.json';
import * as peticionesConf from '../../../assets/json/peticiones.json';
import * as semanaConf from '../../../assets/json/semana.json';
import { Horas } from '../../model/horas/horas';



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

  get semana(): Array<Horas> {
    return (semanaConf as any).default;
  }


}
