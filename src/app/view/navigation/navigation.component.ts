import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Peticion } from '../../model/peticion/peticion.model';
import { Horas } from '../../model/horas/horas';
import { LiquidadorSemanaService } from '../../service/liquidador/liquidador-semana/liquidador-semana.service';

@Component({
  selector: 'app-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {


  public peticion: Peticion;

  //Mostrar o quitar componentes 
  public mostrarInicialForm = true;
  public mostrarBotonVolver = false;
  public mostrarSimulacionSemana = false;
  public mostrarMesForm = false;
  public mostrarSimulacionMes = false;

  public volverAEtapa = 'inicial'; //inicial|sena|

  public semana = Array<Horas>();

  public liquidadorSemanaService: LiquidadorSemanaService


  constructor(liquidadorSemanaService: LiquidadorSemanaService) {
    this.peticion = new Peticion('', 1);
    this.liquidadorSemanaService = liquidadorSemanaService;
  }


  simularSemana(peticion: Peticion) {
    this.mostrarInicialForm = false;
    this.peticion = peticion;
    this.semana = this.liquidadorSemanaService.liquidar(this.peticion);
    this.mostrarSimulacionSemana = true;
    this.mostrarMesForm = true;
    this.volverAEtapa = 'inicial';
    this.mostrarBotonVolver = true;

    console.log("Volver a Etapa: ", this.volverAEtapa);
  }


  simularMes(peticion: Peticion) {
    console.log("Simular mes?_____");
    //ya tengo la semana liquidada en este componente 
    //la debo usar para calcular el mes 
    this.peticion = peticion;
    //console.log("Peticion: ", JSON.stringify(peticion));
    //console.log("Semana: ", JSON.stringify(this.semana));


    //ocultar todas las otras simulaciones y formularios
    this.mostrarSimulacionMes = true;
    this.mostrarSimulacionSemana = false;
    this.mostrarInicialForm = false; 
    this.mostrarMesForm = false;
    this.volverAEtapa = 'semana';
    console.log("Volver a Etapa: ", this.volverAEtapa);
  }


  volverA(paso: string) {
    console.log("Volver A:", paso)
    switch (paso) {
      case 'inicial':
        this.mostrarInicialForm = true;
        this.mostrarMesForm = false; 
        this.mostrarSimulacionSemana = false;
        this.mostrarSimulacionMes = false;
        this.volverAEtapa = '??';
        this.mostrarBotonVolver = false;
        break;
      case 'semana':
        this.mostrarInicialForm = false;
        this.mostrarMesForm = true; 
        this.mostrarSimulacionSemana = true;
        this.mostrarSimulacionMes = false;
        this.volverAEtapa = 'inicial';
        this.mostrarBotonVolver = true;
        break;
      case 'mes':
        this.mostrarInicialForm = true;
        this.mostrarMesForm = false; 
        this.mostrarSimulacionSemana = false;
        this.mostrarSimulacionMes = false;
        this.volverAEtapa = 'semana';
        this.mostrarBotonVolver = true;
        break;
    }
  }

}
