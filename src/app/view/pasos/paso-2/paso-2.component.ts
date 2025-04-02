import { Component, OnInit } from '@angular/core';
import { SimuladorService } from '../../../service/simulacion/simulador.service';
import { Router } from '@angular/router';
import { Mes } from '../../../model/simulacion/mes/mes';
import { Peticion } from '../../../model/peticion/peticion.model';
import { StorageService } from '../../../service/storage/storage.service';

@Component({
  selector: 'app-paso-2',
  standalone: false,
  templateUrl: './paso-2.component.html',
  styleUrl: './paso-2.component.css'
})
export class Paso2Component implements OnInit {

  public simuladorService: SimuladorService;
  private storageService: StorageService;
  public peticion = Object.create(Peticion);
  public mes = Object.create(Mes);
  private router: Router;

  constructor(storageService: StorageService, simuladorService: SimuladorService, router: Router) {
    this.storageService = storageService;
    this.simuladorService = simuladorService;
    this.router = router;
  }


  simularAgno(peticion: Peticion) {
    console.log("Paso3 simular agno->", JSON.stringify(peticion));
    this.simuladorService.simularAgno(peticion);
    this.router.navigate(['/paso-3']);
  }

  ngOnInit(): void {
    this.mes = this.storageService.retrieve('mes');
    this.peticion = this.storageService.retrieve('peticion');
  }
}
