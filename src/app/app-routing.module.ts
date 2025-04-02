import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SemanaSimulacionComponent } from './view/simulacion/semana-simulacion/semana-simulacion.component';
import { MesSimulacionComponent } from './view/simulacion/mes-simulacion/mes-simulacion.component';
import { AgnoSimulacionComponent } from './view/simulacion/agno-simulacion/agno-simulacion.component';
import { LaboralSimulacionComponent } from './view/simulacion/laboral-simulacion/laboral-simulacion.component';
import { ParametrosViewComponent } from './view/documentos/parametros-view/parametros-view.component';
import { SemanaFormComponent } from './view/form/semana-form/semana-form.component';
import { MesFormComponent } from './view/form/mes-form/mes-form.component';
import { AgnoFormComponent } from './view/form/agno-form/agno-form.component';
import { InicialFormComponent } from './view/form/inicial-form/inicial-form.component';
import { Paso0Component } from './view/pasos/paso-0/paso-0.component';
import { Paso1Component } from './view/pasos/paso-1/paso-1.component';
import { Paso2Component } from './view/pasos/paso-2/paso-2.component';
import { Paso3Component } from './view/pasos/paso-3/paso-3.component';
import { Paso4Component } from './view/pasos/paso-4/paso-4.component';

const routes: Routes = [
  {path: '' , component: Paso0Component},
  {path: 'paso-0' , component: Paso0Component},
  {path: 'paso-1' , component: Paso1Component},
  {path: 'paso-2' , component: Paso2Component},
  {path: 'paso-3' , component: Paso3Component},
  {path: 'paso-4' , component: Paso4Component},
  {path: 'inicial-form' , component: InicialFormComponent},
  {path: 'semana' , component: SemanaSimulacionComponent},
  {path: 'semana-form' , component: SemanaFormComponent},
  {path: 'mes' , component: MesSimulacionComponent},
  {path: 'mes-form' , component: MesFormComponent},
  {path: 'agno' , component: AgnoSimulacionComponent},
  {path: 'agno-form' , component: AgnoFormComponent},
  {path: 'laboral' , component: LaboralSimulacionComponent},
  {path: 'parametros' , component: ParametrosViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
