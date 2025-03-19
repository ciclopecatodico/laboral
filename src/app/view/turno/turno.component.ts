import { Component, Input, Output, EventEmitter} from '@angular/core';
import { List } from '../../model/listas/list';
import { SelectItem } from '../../model/selectItem/SelectItem';
import moment, { duration } from 'moment';
import { Turno } from '../../model/turno/turno';

@Component({
  selector: 'app-turno',
  standalone: false,
  templateUrl: './turno.component.html',
  styleUrl: './turno.component.css'
})
export class TurnoComponent {

  @Input() 
  nombre = 'Turno 1';
  @Input() 
  id = '1';
  @Output() 
  turnoEmitter = new EventEmitter<Turno>();

  public lista = new List();
  public horaInicio = '8:00 AM';
  public horaFin = '1:00 PM';
  public horas = '05:00';
  public horasTurno = '00:00';
  public days: SelectItem[] = new Array<SelectItem>();
  public invalidFin = false;

  public inicio = moment(this.horaInicio, 'hh:mm a');
  public fin = moment(this.horaFin, 'hh:mm a');

  public setHoraInicio(time: string) {
    this.inicio = moment(time, 'hh:mm a');
    this.setHoraFin(time);
    this.horaFin = time;
  }

  public setHoraFin(time: string) {
    this.fin = moment(time, 'hh:mm a');
    if (this.fin.isBefore(this.inicio)) {
      this.invalidFin = true;
    } else {
      this.invalidFin = false;
      let hours = this.inicio.format('HH:mm:ss');
      let duration = moment.duration(hours);
      let finAux = this.fin;
      finAux.subtract(duration);
      this.horas = finAux.format('HH:mm');
    }
  }

  public setDays(days: SelectItem[]) {
    this.days = days;
    this.calcularHorasTurno();
  }

  public calcularHorasTurno() {
    if(this.horas){
      let mm = moment.duration(this.horas);
      let turnoMs = mm.asMilliseconds();
      let semanaMs = 0;
      this.days.forEach( d => {
        if(d.selected){
          semanaMs = semanaMs + turnoMs;
        }
      })
      let semana = moment.duration(semanaMs); 
      this.horasTurno = semana.asHours()+"";
    }
    
    let turno = new Turno();
    turno.id = this.id;
    turno.inicio = this.horaInicio;
    turno.fin = this.horaFin;
    turno.dias = this.days;
    this.turnoEmitter.emit(turno);
  }

}
