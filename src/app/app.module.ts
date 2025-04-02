import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { FormsModule } from '@angular/forms';
import { TurnoComponent } from './view/turno/turno.component';
import { DayPickerComponent } from './view/day-picker/day-picker.component';
import { HorasSemanaComponent } from './view/horas/horas-semana/horas-semana.component';
import { SemanaSimulacionComponent } from './view/simulacion/semana-simulacion/semana-simulacion.component';
import { HorasMesComponent } from './view/horas/horas-mes/horas-mes.component';

import { InicialFormComponent } from './view/form/inicial-form/inicial-form.component';
import { MesFormComponent } from './view/form/mes-form/mes-form.component';

import { MesSimulacionComponent } from './view/simulacion/mes-simulacion/mes-simulacion.component';
import { AgnoSimulacionComponent } from './view/simulacion/agno-simulacion/agno-simulacion.component';
import { CreditsComponent } from './view/credits/credits.component';
import { AgnoFormComponent } from './view/form/agno-form/agno-form.component';
import { NavegacionComponent } from './view/navegacion/navegacion.component';
import { ParametrosViewComponent } from './view/documentos/parametros-view/parametros-view.component';
import { HorasAgnoComponent } from './view/horas/horas-agno/horas-agno.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DonaComponent } from './view/graficos/dona/grafico.component';
import { BarrasSimpleComponent } from './view/graficos/barras-simple/barras-simple.component';
import { BarrasCompuestoComponent } from './view/graficos/barras-compuesto/barras-compuesto.component';
import { LaboralSimulacionComponent } from './view/simulacion/laboral-simulacion/laboral-simulacion.component';
import { SemanaFormComponent } from './view/form/semana-form/semana-form.component';
import { Paso0Component } from './view/pasos/paso-0/paso-0.component';
import { Paso1Component } from './view/pasos/paso-1/paso-1.component';
import { Paso2Component } from './view/pasos/paso-2/paso-2.component';
import { Paso3Component } from './view/pasos/paso-3/paso-3.component';
import { Paso4Component } from './view/pasos/paso-4/paso-4.component';
import { HorasLaboralComponent } from './view/horas/horas-laboral/horas-laboral.component';
import { ParametrosComponent } from './view/documentos/parametros/parametros.component';

@NgModule({
  declarations: [
    AppComponent,
    TurnoComponent,
    DayPickerComponent,
    HorasSemanaComponent,
    HorasMesComponent,
    HorasAgnoComponent,
    HorasLaboralComponent,
    SemanaSimulacionComponent,
    InicialFormComponent,
    SemanaFormComponent,
    MesFormComponent,
    AgnoFormComponent,
    MesSimulacionComponent,
    AgnoSimulacionComponent,
    CreditsComponent,
    NavegacionComponent,
    ParametrosViewComponent,
    DonaComponent, 
    BarrasSimpleComponent,
    BarrasCompuestoComponent,
    LaboralSimulacionComponent,
    Paso0Component,
    Paso1Component,
    Paso2Component,
    Paso3Component,
    Paso4Component,
    ParametrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgApexchartsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
