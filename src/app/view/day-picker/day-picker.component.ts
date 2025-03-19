import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { List } from '../../model/listas/list';
import { SelectItem } from '../../model/selectItem/SelectItem';

@Component({
  selector: 'day-picker',
  standalone: false,
  templateUrl: './day-picker.component.html',
  styleUrl: './day-picker.component.css'
})
export class DayPickerComponent implements OnInit {

  public daysList: SelectItem[] = new Array<SelectItem>();

  @Output()
  days = new EventEmitter<SelectItem[]>();

  constructor() {

  }

  ngOnInit(): void {
    const list = new List();
    list.dias.forEach(d => {
      let day = new SelectItem(d.id, d.label, false);
      this.daysList.push(day);
    });
  }



  public selectDay(day: SelectItem) {
    day.selected = !day.selected;
    this.days.emit(this.daysList);
  }

  public clear(){
    this.daysList.forEach( d => {
      d.selected = false;
    });
    this.days.emit(this.daysList);
  }

}
