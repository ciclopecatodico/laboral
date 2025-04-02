import { TestBed } from '@angular/core/testing';

import { LiquidadorMesService } from './liquidador-mes.service';

describe('LiquidadorMesesService', () => {
  let service: LiquidadorMesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidadorMesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
