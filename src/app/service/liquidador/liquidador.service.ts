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


  public configurationService: ConfigurationService;

  public semana789 = new Array<Horas>();
  public semana2025 = new Array<Horas>();
  public semana1950 = new Array<Horas>();



  constructor(semanaService: SemanaService, mesService: MesService, configurationService: ConfigurationService) {
    this.semanaService = semanaService;
    this.mesService = mesService;
    this.configurationService = configurationService;


  }

  public liquidar(peticion: Peticion): Array<Horas> {
    this.semana1950 = this.semanaService.calcularSemana(peticion, CONST.reforma1950.index);
    this.semana789 = this.semanaService.calcularSemana(peticion, CONST.reforma789.index);
    this.semana2025 = this.semanaService.calcularSemana(peticion, CONST.reforma2025.index);

    this.calcularTotales(this.semana1950, CONST.reforma1950.style);
    this.calcularTotales(this.semana789, CONST.reforma789.style);
    this.calcularTotales(this.semana2025, CONST.reforma2025.style);

    let semana = new Array<Horas>();
    for (let i = 0; i < this.semana2025.length; i++) {
      semana.push(this.semana1950[i]);
      semana.push(this.semana789[i]);
      semana.push(this.semana2025[i]);
    }
    return semana;
  }

  public calcularTotales(semana: Array<Horas>, style : string) {
    let horasDiurnas = 0;
    let horasNocturnas = 0;
    let horasExtraDiurna = 0;
    let horasExtraNocturna = 0;
    let totalHoras = 0;

    semana.forEach(dia => {
      horasDiurnas += dia.horasDiurnas;
      horasNocturnas += dia.horasNocturnas;
      horasExtraDiurna += dia.horasExtraDiurna;
      horasExtraNocturna += dia.horasExtraNocturna;
      totalHoras += dia.totalHoras;
    });
    let total = new Horas("total", "Total", semana[0].reforma, style,[], horasDiurnas, horasNocturnas, horasExtraDiurna, horasExtraNocturna, 0, 0, 0, 0, totalHoras);
    semana.push(total);
  }

}
