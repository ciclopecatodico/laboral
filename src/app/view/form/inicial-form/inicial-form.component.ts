import { Component, EventEmitter, Input, Output } from '@angular/core';

import moment from 'moment';
import { Peticion } from '../../../model/peticion/peticion.model';
import { Turno } from '../../../model/turno/turno';
import { ConfigurationService } from '../../../service/configuration/configuration.service';
import { CONST } from '../../../model/const/CONST';
import { Credito } from '../../../model/credito/credito';




@Component({
  selector: 'inicial-form',
  templateUrl: './inicial-form.component.html',
  styleUrl: './inicial-form.component.css',
  standalone: false,
})
export class InicialFormComponent {


  @Output()
  public peticionChange = new EventEmitter<Peticion>;
  public peticion_: Peticion;

  public turnos: Turno[] = new Array<Turno>();

  public configurationService: ConfigurationService;
  public contacto: Credito;

  constructor(configurationService: ConfigurationService) {
    this.configurationService = configurationService;
    this.peticion_ = configurationService.peticiones[1];
    this.contacto = configurationService.creditos[0];
    this.reiniciarTurnos();
  }

  public agregarTurno() {
    let id = 0;
    if (this.turnos.length == 1) {
      id = this.turnos[0].id + 1;
    } else {
      id = this.turnos[0].id;
      this.turnos.forEach(turno => {
        if (id < turno.id) {
          id = turno.id;
        }
      })
      id = id + 1;
    }
    if (this.turnos.length < 5) {
      let turno = new Turno(id, CONST.turnoNombrePrefix + ' ' + id, CONST.turnoInicio, CONST.turnoFin, true);
      this.turnos.push(turno);
    } else {
      alert("Máximo de turnos alcanzado");
    }
  }

  public deleteTurno(event: any) {
    if (this.turnos.length > 1) {
      let index = this.turnos.findIndex(t => t.id === event);
      this.turnos.splice(index, 1);
      this.validarTodosTurnos();
    } else {
      alert("No se puede eliminar");
    }
  }

  public setTurno(turno: Turno) {
    let index = this.turnos.findIndex(t => t.id === turno.id);
    this.turnos[index] = turno;
    this.validarTodosTurnos();
  }

  public validarTodosTurnos() {
    //hacemos todos los turnos validos previo a la validacion: 
    this.turnos.forEach(t => t.valido = true);
    //validamos todos los turnos
    for (let i = 0; i < this.turnos.length - 1; i++) {
      for (let j = 1; j < this.turnos.length; j++) {
        if (i != j) {
          let turno1 = this.turnos[i];
          let turno2 = this.turnos[j];
          this.validarTurnos(turno1, turno2);
        }
      }
    }
  }

  public validarTurnos(turno1: Turno, turno2: Turno) {
    //verificamos que los horarios no se sobrepongan
    let inicio1 = moment(turno1.inicio, 'HH:mm');
    let inicio2 = moment(turno2.inicio, 'HH:mm');
    let fin1 = moment(turno1.fin, 'HH:mm');
    let fin2 = moment(turno2.fin, 'HH:mm');
    let hourOverlap = false;
    //si se sobreponen podrían ser inválidos
    if (inicio1.isSame(inicio2) || fin1.isSame(fin2)) {
      hourOverlap = true;
    }
    if (inicio1.isAfter(inicio2) && inicio1.isBefore(fin2)) {
      hourOverlap = true;
    }
    if (fin1.isAfter(inicio2) && fin1.isBefore(fin2)) {
      hourOverlap = true;
    }
    //verificamos que los días no se sobrepongan
    let dayOverlap = false;
    if (turno1.dias && turno2.dias) {
      const overlap = turno1.dias.find(d1 => turno2.dias?.find(d2 => d2 === d1));
      if (overlap) {
        dayOverlap = true;
      }
    }
    //Si se sobreponen las horas y los días los turnos son inválidos. 
    if (hourOverlap && dayOverlap) {
      //solo actualizo la validez del turno si antes era valido
      if (turno1.valido) {
        turno1.valido = false;
      }
      if (turno2.valido) {
        turno2.valido = false;
      }
    }
  }

  public asStr(t: any) {
    return JSON.stringify(t);
  }

  /**
   * Procesar la petición realizar todos los cálculos 
   */
  public process() {
    if (!this.validarFormulario()) {
      alert("Datos inválidos");
    } else {
      this.peticion_.turnos = this.turnos;
      this.peticionChange.emit(this.peticion_);
    }
  }


  public borrar() {
    if (confirm("Eliminará todos los datos")) {
      this.reiniciarTurnos();
      this.peticion_ = this.configurationService.peticiones[1];
    }
  }

  public reiniciarTurnos() {
    this.turnos = new Array<Turno>();
    let turno = new Turno(1, CONST.turnoNombrePrefix + ' 1', CONST.turnoInicio, CONST.turnoFin, true);
    //let turno2 = new Turno(2, CONST.turnoNombrePrefix+' 2', '12:00', '23:00', true);
    // let turno3 = new Turno(3, CONST.turnoNombrePrefix+' 3', '08:00', '13:00', true);
    // let turno4 = new Turno(4, CONST.turnoNombrePrefix+' 4', '14:00', '19:00', true);
    this.turnos.push(turno);
    // this.turnos.push(turno2);
    // this.turnos.push(turno3);
    // this.turnos.push(turno4);
  }

  @Input()
  set peticion(peticion: Peticion) {
    this.peticion_ = peticion;
  }

  get peticion() {
    return this.peticion_;
  }


  public validarFormulario(): boolean {
    let dias = 0;
    this.turnos.forEach(
      t => {
        if (t.dias) {
          dias += t.dias.length;
        }
      })
    return dias > 0;
  }

}
