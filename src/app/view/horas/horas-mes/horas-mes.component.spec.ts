import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasMesComponent } from './horas-mes.component';

describe('HorasMesComponent', () => {
  let component: HorasMesComponent;
  let fixture: ComponentFixture<HorasMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorasMesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
