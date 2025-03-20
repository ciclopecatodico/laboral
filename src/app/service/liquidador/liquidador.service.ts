import { Injectable } from '@angular/core';
import { Peticion } from '../../model/peticion/peticion.model';
import { Parametros } from '../../model/parametros/parametros';
import { SemanaService } from '../semana/semana.service';



import { MesService } from '../mes/mes.service';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class LiquidadorService {

  public semanaService: SemanaService;
  public mesService: MesService;
  public configurationService : ConfigurationService;
  public parametros: Parametros[];


  constructor(semanaService: SemanaService, mesService: MesService, configurationService : ConfigurationService) {
    this.semanaService = semanaService;
    this.mesService = mesService;
    this.configurationService = configurationService;
    this.parametros = configurationService.parametros;
  }

  public liquidar(peticion: Peticion) {
    //console.log("Peticion:", JSON.stringify(peticion));
    //console.log("Parametros", JSON.stringify(parametros));
    let parametro = this.parametros[0];
    peticion.valorHora = Math.round(peticion.salario/ parametro.jornadaLaboralMensual);
    let semana = this.semanaService.calcularSemana(peticion, parametro);
    //console.log("Semana: ", JSON.stringify(semana));
    let mes = this.mesService.calcular(semana, parametro, peticion.valorHora);
    console.log("Mes: ", JSON.stringify(mes));
  }
  
}
