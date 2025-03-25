import { TestBed } from '@angular/core/testing';
import { LiquidadorSemanaService } from './liquidador-semana.service';



describe('LiquidadorSemanaService', () => {
  let service: LiquidadorSemanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidadorSemanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
