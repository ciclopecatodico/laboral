import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesSimulacionComponent } from './mes-simulacion.component';

describe('MesSimulacionComponent', () => {
  let component: MesSimulacionComponent;
  let fixture: ComponentFixture<MesSimulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesSimulacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesSimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
