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
  public semana = Object.create(Semana);
  public peticion = Object.create(Peticion);
  private router: Router

  constructor(storageService: StorageService, simuladorService: SimuladorService, router: Router) {
    this.storageService = storageService;
    this.simuladorService = simuladorService;
    this.router = router;
  }

  simularMes(peticion: Peticion) {
    console.log("Paso1 simular Mes->", JSON.stringify(peticion));
    this.simuladorService.simularMes(peticion);
    this.router.navigate(['/paso-2']);
  }

  ngOnInit(): void {
    this.semana = this.storageService.retrieve('semana');
    this.peticion = this.storageService.retrieve('peticion');
  }
}
