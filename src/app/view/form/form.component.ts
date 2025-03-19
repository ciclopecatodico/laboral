import { Component } from '@angular/core';
import { Peticion } from '../../model/peticion/peticion.model';
import { FormControl, NgForm } from '@angular/forms';
import { Turno } from '../../model/turno/turno';
import moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  standalone: false,
})
export class FormComponent {

  public peticion: Peticion = new Peticion();

  public turnos: Turno[] = new Array<Turno>();


  constructor() {
    let turno = new Turno(1, 'Bloque 1', '8:00 AM', '1:00 PM', true);
    this.turnos.push(turno);
  }

  public addTurno() {
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
      let turno = new Turno(id, 'Bloque ' + id, '8:00 AM', '1:00 PM', true);
      this.turnos.push(turno);
    } else {
      alert("Máximo de turnos alcanzado");
    }
  }

  public deleteTurno(event: any) {
    if (this.turnos.length > 1) {
      let index = this.turnos.findIndex(t => t.id === event);
      this.turnos.splice(index, 1);
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
    if (this.turnos.length == 1) {
      this.turnos[0].valido = true;
      return;
    }
    for (let i = 0; i < this.turnos.length - 1; i++) {
      for (let j = 1; j < this.turnos.length; j++) {
        let turno1 = this.turnos[i];
        let turno2 = this.turnos[j];
        this.validarTurnos(turno1, turno2);
      }
    }
  }

  public validarTurnos(turno1: Turno, turno2: Turno) {
    //verificamos que los horarios no se sobrepongan
    let inicio1 = moment(turno1.inicio, 'hh:mm a');
    let inicio2 = moment(turno2.inicio, 'hh:mm a');
    let fin1 = moment(turno1.fin, 'hh:mm a');
    let fin2 = moment(turno2.fin, 'hh:mm a');
    let hourOverlap = false;
    if (inicio1.isBefore(fin2) || inicio2.isBefore(fin1)) {
      //si se sobreponen podrían ser inválidos
      hourOverlap = true;
    }
    //verificamos que los días no se sobrepongan
    let dayOverlap = false;
    if (turno1.dias && turno2.dias) {
      const overlap = turno1.dias.find( d1 => turno2.dias?.find( d2 => d2 == d1) ); 
      if(overlap){
        dayOverlap = true;
      }
    }
    //Si se sobreponen las horas y los días los turnos son inválidos. 
    let valido = true;
    if (hourOverlap && dayOverlap) {
      valido = false;
    }
    turno1.valido = valido;
    turno2.valido = valido;
  }

  public asStr(t: any) {
    return JSON.stringify(t);
  }

}
