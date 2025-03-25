import { TestBed } from '@angular/core/testing';

import { LiquidadorHorasService } from './liquidador-horas.service';

describe('LiquidadorHorasService', () => {
  let service: LiquidadorHorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidadorHorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
