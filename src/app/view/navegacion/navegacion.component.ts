import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../model/peticion/peticion.model';
import { LiquidadorSemanaService } from '../../service/liquidador/liquidador-semana/liquidador-semana.service';
import { LiquidadorMesService } from '../../service/liquidador/liquidador-mes/liquidador-mes.service';
import { LiquidadorMesesService } from '../../service/liquidador/liquidador-meses/liquidador-meses.service';

import { LiquidadorAgnosService } from '../../service/liquidador/liquidador-agnos/liquidador-agnos.service';
import { Laboral } from '../../model/simulacion/laboral/laboral';
import { Agno } from '../../model/simulacion/agno/ango';
import { Semana } from '../../model/simulacion/semana/semana';
import { Mes } from '../../model/simulacion/mes/mes';

@Component({
  selector: 'app-navegacion',
  standalone: false,
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent {


  public peticion: Peticion;

  //Mostrar o quitar componentes 
  public mostrarParametros = false;
  public mostrarInicialForm = true;
  public mostrarSemanaForm = false;
  public mostrarMesForm = false;
  public mostrarAgnoForm = false;
  public mostrarSemanaSimulacion = false;
  public mostrarMesSimulacion = false;
  public mostrarAgnoSimulacion = false;
  public mostrarLaboralSimulacion = false;

  public volverAEtapa = 'inicial'; //inicial|sena|
  public semana = Object.create(Semana);
  public agno = Object.create(Agno)
  public mes = Object.create(Mes)
  public laboral = Object.create(Laboral)
  //Se encarga de liquidar las horas de una semana 
  public liquidadorSemanaService: LiquidadorSemanaService;
  //Se encarga de liquidar un año, conjunto de 12 meses
  public liquidadorMesService: LiquidadorMesService;
  //Se encarga de liquidar un año, conjunto de 12 meses
  public liquidadorMesesService: LiquidadorMesesService;
  //Se encarga de liquidar muchos años
  public liquidadorAgnosService: LiquidadorAgnosService;


  constructor(liquidadorSemanaService: LiquidadorSemanaService,
    liquidadorMesService: LiquidadorMesService,
    liquidadorMesesService: LiquidadorMesesService,
    liquidadorAgnosService: LiquidadorAgnosService) {
    this.peticion = new Peticion('', 1);
    this.liquidadorSemanaService = liquidadorSemanaService;
    this.liquidadorMesService = liquidadorMesService;
    this.liquidadorMesesService = liquidadorMesesService;
    this.liquidadorAgnosService = liquidadorAgnosService;
  }

  simularSemana(peticion: Peticion) {
    this.mostrarInicialForm = false;
    this.peticion = peticion;
    this.semana = Object.create(Semana);
    this.semana = this.liquidadorSemanaService.simular(this.peticion);
    this.navegarA('semana');
    this.volverAEtapa = 'inicial';
  }

  simularMes(peticion: Peticion) {
    //ya tengo la semana liquidada en este componente 
    //la debo usar para calcular el mes 
    this.peticion = peticion;
    this.mes = this.liquidadorMesService.simularMes(this.semana.horasSemana, this.peticion);
    //ocultar todas las otras simulaciones y formularios
    this.navegarA('mes');
    this.volverAEtapa = 'semana';
    console.log("Volver a Etapa: ", this.volverAEtapa);
  }


  simularAgno(peticion: Peticion) {
    //ya tengo la semana liquidada en este componente 
    //la debo usar para calcular el mes 
    this.peticion = peticion;
    this.agno = this.liquidadorMesesService.simularMeses(this.semana.horasSemana, this.peticion);
    this.navegarA('agno');
    this.volverAEtapa = 'mes';
    console.log("Volver a Etapa: ", this.volverAEtapa);
  }

  simularLaboral(peticion: Peticion) {
    peticion.salario = this.agno.salario;
    console.log("peticion: ", JSON.stringify(peticion));
    this.laboral = this.liquidadorAgnosService.simularAngos(this.agno.meses, this.peticion);
    this.peticion = peticion;
    this.navegarA('historia');
    this.volverAEtapa = 'agno';
    console.log("Volver a Etapa: ", this.volverAEtapa);
  }


  /**
   * Habilita componentes para simular una navegación 
   * @param paso 
   */
  navegarA(paso: string) {
    console.log("Volver A:", paso)
    switch (paso) {
      case 'parametros':
        this.mostrarParametros = true;
        //semana
        this.mostrarSemanaSimulacion = false;
        this.mostrarInicialForm = false;
        //mes
        this.mostrarMesSimulacion = false;
        this.mostrarSemanaForm = false;
        //agno
        this.mostrarAgnoSimulacion = false;
        this.mostrarMesForm = false;
        //laboral
        this.mostrarLaboralSimulacion = false;
        this.mostrarAgnoForm = false;
        //volver a 
        this.volverAEtapa = 'inicial';
        break;
      case 'inicial':
        this.mostrarParametros = false;
        //semana
        this.mostrarInicialForm = true;
        this.mostrarSemanaSimulacion = false;
        //mes
        this.mostrarSemanaForm = false;
        this.mostrarMesSimulacion = false;
        //agno
        this.mostrarMesForm = false;
        this.mostrarAgnoSimulacion = false;
        //laboral
        this.mostrarAgnoForm = false;
        this.mostrarLaboralSimulacion = false;
        //volver a 
        this.volverAEtapa = 'inicial';
        break;
      case 'semana':
        this.mostrarParametros = false;
        //semana
        this.mostrarInicialForm = false;
        this.mostrarSemanaSimulacion = true;
        //mes
        this.mostrarSemanaForm = true;
        this.mostrarMesSimulacion = false;
        //agno
        this.mostrarMesForm = false;
        this.mostrarAgnoSimulacion = false;
        //laboral
        this.mostrarAgnoForm = false;
        this.mostrarLaboralSimulacion = false;
        //volver a 
        this.volverAEtapa = 'inicial';
        break;

      case 'mes':
        this.mostrarParametros = false;
        //semana
        this.mostrarInicialForm = false;
        this.mostrarSemanaSimulacion = false;
        //mes
        this.mostrarSemanaForm = false;
        this.mostrarMesSimulacion = true;
        //agno
        this.mostrarMesForm = true;
        this.mostrarAgnoSimulacion = false;
        //laboral
        this.mostrarAgnoForm = false;
        this.mostrarLaboralSimulacion = false;
        //volver a 
        this.volverAEtapa = 'semana';
        break;
      case 'agno':
        this.mostrarParametros = false;
        //semana
        this.mostrarInicialForm = false;
        this.mostrarSemanaSimulacion = false;
        //mes
        this.mostrarSemanaForm = false;
        this.mostrarMesSimulacion = false;
        //agno
        this.mostrarMesForm = false;
        this.mostrarAgnoSimulacion = true;
        //laboral
        this.mostrarAgnoForm = true;
        this.mostrarLaboralSimulacion = false;
        //volver a 
        this.volverAEtapa = 'mes';
        break;
      case 'historia':
        this.mostrarParametros = false;
        //semana
        this.mostrarInicialForm = false;
        this.mostrarSemanaSimulacion = false;
        //mes
        this.mostrarSemanaForm = false;
        this.mostrarMesSimulacion = false;
        //agno
        this.mostrarMesForm = false;
        this.mostrarAgnoSimulacion = false;
        //laboral
        this.mostrarAgnoForm = false;
        this.mostrarLaboralSimulacion = true;
        //volver a 
        this.volverAEtapa = 'agno';
        break;
    }
  }

}
