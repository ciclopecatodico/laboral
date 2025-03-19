import { Component } from '@angular/core';
import { Peticion } from '../../model/peticion/peticion.model';
import { FormControl, NgForm } from '@angular/forms';
import { Turno } from '../../model/turno/turno';

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
    let turno = new Turno(1, 'Bloque 1', '8:00 AM', '1:00 PM');
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
      let turno = new Turno(id, 'Bloque ' + id, '8:00 AM', '1:00 PM');
      this.turnos.push(turno);
    } else {
      alert("Máximo de turnos alcanzado");
    }
  }

  public deleteTurno(event: any) {
    if(this.turnos.length > 1){
      let index = this.turnos.findIndex(t => t.id === event);
      this.turnos.splice(index, 1);
    }else {
      alert("No se puede eliminar");
    }
  }

  public setTurno(turno: Turno) {
    let index = this.turnos.findIndex(t => t.id === turno.id);
    this.turnos[index] = turno;
  }

  public asStr(t: any) {
    return JSON.stringify(t);
  }

}
