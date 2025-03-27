import { Injectable } from '@angular/core';
import { Peticion } from '../../../model/peticion/peticion.model';
import { LiquidadorHorasService } from '../liquidador-horas/liquidador-horas.service';

import { HorasSemana } from '../../../model/liquidacion/horas-semana/horas-semana';
import { CONST } from '../../../model/const/CONST';

/**
 * Liquida las horas totales diarias para una semana segun los horarios definidos en una reforma. 
 */
@Injectable({
  providedIn: 'root'
})
export class LiquidadorSemanaService {

  public liquidadorHorasService: LiquidadorHorasService;

  public semana789 = new Array<HorasSemana>();
  public semana2025 = new Array<HorasSemana>();
  public semana1950 = new Array<HorasSemana>();

  constructor(liquidadorHorasService: LiquidadorHorasService) {
    this.liquidadorHorasService = liquidadorHorasService;
  }

  public liquidar(peticion: Peticion): Array<HorasSemana> {
    this.semana1950 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma1950.index);
    this.semana789 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma789.index);
    this.semana2025 = this.liquidadorHorasService.calcularSemana(peticion, CONST.reforma2025.index);

    this.calcularTotales(this.semana1950, CONST.reforma1950.style);
    this.calcularTotales(this.semana789, CONST.reforma789.style);
    this.calcularTotales(this.semana2025, CONST.reforma2025.style);

    let semana = new Array<HorasSemana>();
    semana = [...this.semana1950, ...this.semana789, ...this.semana2025];
    return semana;
  }

  public calcularTotales(semana: Array<HorasSemana>, style : string) {
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

    let total = new HorasSemana("total", "Total", semana[0].reformaName, semana[0].reformaLabel, style,[], horasDiurnas, horasNocturnas, horasExtraDiurna, horasExtraNocturna, 0, 0, 0, 0, totalHoras);
    semana.push(total);
  }

}
