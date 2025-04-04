import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrasAcumuladoComponent } from './barras-acumulado.component';

describe('BarrasComponent', () => {
  let component: BarrasAcumuladoComponent;
  let fixture: ComponentFixture<BarrasAcumuladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarrasAcumuladoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarrasAcumuladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
