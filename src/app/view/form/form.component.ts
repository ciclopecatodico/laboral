import { Component } from '@angular/core';
import { Peticion } from '../../model/peticion/peticion.model';
import {FormControl, NgForm} from '@angular/forms';
import { Turno } from '../../model/turno/turno';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  standalone: false,
})
export class FormComponent {

  public peticion : Peticion = new Peticion();

  public jornada = '';

  public nombreTurno = 'Turno 1';
  public idTurno = '1';
  
  public setTurno(turno: Turno){
    console.log("Set turno en FORM: ", JSON.stringify(turno));
  }

}
