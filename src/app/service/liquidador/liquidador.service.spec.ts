import { TestBed } from '@angular/core/testing';
import { LiquidadorService } from './liquidador.service';



describe('LiquidadorService', () => {
  let service: LiquidadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
