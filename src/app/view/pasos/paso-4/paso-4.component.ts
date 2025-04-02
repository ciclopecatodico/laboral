import { Component, OnInit } from '@angular/core';
import { Laboral } from '../../../model/simulacion/laboral/laboral';
import { Peticion } from '../../../model/peticion/peticion.model';
import { StorageService } from '../../../service/storage/storage.service';

@Component({
  selector: 'app-paso-4',
  standalone: false,
  templateUrl: './paso-4.component.html',
  styleUrl: './paso-4.component.css'
})
export class Paso4Component implements OnInit {

  private storageService: StorageService;
  public peticion : Peticion; 
  public laboral : Laboral;

  constructor(storageService: StorageService){
    this.storageService = storageService;
    this.peticion = Object.create(Peticion);
    this.laboral =  Object.create(Laboral);
  }

  ngOnInit(): void {
    this.laboral = this.storageService.retrieve('laboral');
    this.peticion = this.storageService.retrieve('peticion');
  }

}
