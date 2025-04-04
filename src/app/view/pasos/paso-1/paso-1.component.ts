import { Component, OnInit } from '@angular/core';
import { Semana } from '../../../model/simulacion/semana/semana';
import { Peticion } from '../../../model/peticion/peticion.model';
import { SimuladorService } from '../../../service/simulacion/simulador.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../service/storage/storage.service';

@Component({
  selector: 'app-paso-1',
  standalone: false,
  templateUrl: './paso-1.component.html',
  styleUrl: './paso-1.component.css'
})
export class Paso1Component implements OnInit {

  public simuladorService: SimuladorService;
  private storageService: StorageService;
  public semana: Semana;
  public peticion: Peticion;
  private router: Router

  constructor(storageService: StorageService, simuladorService: SimuladorService, router: Router) {
    this.storageService = storageService;
    this.simuladorService = simuladorService;
    this.router = router;
    this.semana = Object.create(Semana);
    this.peticion = Object.create(Peticion);
  }

  simularMes(peticion: Peticion) {
    this.simuladorService.simularMes(peticion);
    this.storageService.save('peticion', this.peticion);
    this.router.navigate(['/paso-2']);
  }

  ngOnInit(): void {
    this.semana = this.storageService.retrieve('semana');
    this.peticion = this.storageService.retrieve('peticion');
  }
}
