import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemanaGraficoComponent } from './semana-grafico.component';

describe('SemanaGraficoComponent', () => {
  let component: SemanaGraficoComponent;
  let fixture: ComponentFixture<SemanaGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SemanaGraficoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemanaGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
