import { Injectable } from '@angular/core';
import { Peticion } from '../../model/peticion/peticion.model';
import { Parametros } from '../../model/parametros/parametros';
import { SemanaService } from '../semana/semana.service';



import { MesService } from '../mes/mes.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { Horas } from '../../model/horas/horas';
import { CONST } from '../../model/conf/conf';

@Injectable({
  providedIn: 'root'
})
export class LiquidadorService {

  public semanaService: SemanaService;
  public mesService: MesService;


  public configurationService : ConfigurationService;

  public semanaUribe = new Array<Horas>();
  public semanaPetro = new Array<Horas>();
  public semanaAntesUribe = new Array<Horas>();



  constructor(semanaService: SemanaService, mesService: MesService, configurationService : ConfigurationService) {
    this.semanaService = semanaService;
    this.mesService = mesService;
    this.configurationService = configurationService;
    
    
  }

  public liquidar(peticion: Peticion) : Array<Horas>{    
    this.semanaAntesUribe = this.semanaService.calcularSemana(peticion, CONST.paramsAntesDeUribe);
    this.semanaUribe = this.semanaService.calcularSemana(peticion, CONST.paramsConUribe);
    this.semanaPetro = this.semanaService.calcularSemana(peticion, CONST.paramsConPetro);
    
    let semana = new Array<Horas>();
    for(let i = 0; i<this.semanaPetro.length; i++){
      semana.push(this.semanaAntesUribe[i]);
      semana.push(this.semanaUribe[i]);
      semana.push(this.semanaPetro[i]);
    }
    return semana;
  }
  
}
