import { Component } from '@angular/core';
import { Peticion } from '../../model/peticion/peticion.model';
import {FormControl, NgForm} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  standalone: false,
})
export class FormComponent {

  public peticion : Peticion = new Peticion();

  nombres = new FormControl('');
  
  

}
