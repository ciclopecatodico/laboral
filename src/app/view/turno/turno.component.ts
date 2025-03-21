import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { List } from '../../model/listas/list';
import { SelectItem } from '../../model/selectItem/SelectItem';
import moment, { Duration, duration } from 'moment';
import { Turno } from '../../model/turno/turno';
import { CONST } from '../../model/conf/conf';

@Component({
  selector: 'app-turno',
  standalone: false,
  templateUrl: './turno.component.html',
  styleUrl: './turno.component.css'
})
export class TurnoComponent implements OnInit {

  public turno_ : Turno;
  public lista = new List();
  public horas;
  public horasTurno;
  public days: SelectItem[] = new Array<SelectItem>();
  public invalidFin = false;

  public horaInicio;
  public horaFin;
  public medianoche = false;

  @Output()
  public turnoChange = new EventEmitter<Turno>();
  
  @Output()
  public deleteEmitter = new EventEmitter<number>();

  constructor(){
    this.turno_ = new Turno(1, 'Turno 1', CONST.turnoInicio, CONST.turnoFin, true);
    this.horas = CONST.turnoHoras;
    this.horasTurno = CONST.turnoHoras;
    this.horaInicio = CONST.turnoInicio;
    this.horaFin = CONST.turnoFin;
  }

  ngOnInit(): void {
    if(this.turno_){
      
    }
  }

  public setHoraInicio() {
    this.turno_.inicio = this.horaInicio;
    this.horaFin = this.horaInicio;
    this.setHoraFin();
  }

  public setHoraFin(){
    let fin = moment(this.horaFin, 'HH:mm');
    let turnoFin = this.horaFin;
    if(this.medianoche){
      fin = moment('00:00', 'HH:mm').add(1, 'd');
      turnoFin = CONST.mediaNoche;
      this.horaFin = '00:00';
    }
    let inicio = moment(this.horaInicio,  'HH:mm');
    if (fin.isBefore(inicio)) {
      this.invalidFin = true;
    } else {
      this.invalidFin = false;
      let hours = inicio.format('HH:mm');
      let duration = moment.duration(hours);
      fin.subtract(duration);
      this.horas = fin.format('HH:mm');
    }
    this.turno_.fin = turnoFin;
    this.turnoChange.emit(this.turno_);
  }

  public setDays(days: SelectItem[]) {
    this.days = days;
    this.calcularHorasTurno();
  }

  public calcularHorasTurno() {
    this.turno_.dias = [];
    if (this.horas) {
      let baseMm = 0
      let minutosTurno = moment.duration(this.horas).asMinutes();
      this.days.forEach(d => {
        if (d.selected) {
          baseMm = baseMm + minutosTurno;
          if (d.id) {
            this.turno_.dias?.push(d.id);
          }
        }
      })
      const duration = moment.duration(baseMm, 'minutes').asMinutes();
      const horas =  Math.floor(duration / 60);
      const minutos = duration % 60;
      this.horasTurno = horas+':'+minutos;
    }
    this.turnoChange.emit(this.turno_);
  }

  eliminarTurno(id: number) {
    this.deleteEmitter.emit(id);
  }

  @Input()
  set turno(turno:Turno) {
    //TODO calcular las horas del turno 
    this.turno_ =  turno;
    this.horaInicio = turno.inicio;
    this.horaFin = turno.fin;
  }

  get turno(){
    return this.turno_;
  }

}
