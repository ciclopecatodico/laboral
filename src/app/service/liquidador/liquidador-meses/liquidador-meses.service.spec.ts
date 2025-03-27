import { TestBed } from '@angular/core/testing';

import { LiquidadorMesesService } from './liquidador-meses.service';

describe('LiquidadorMesesService', () => {
  let service: LiquidadorMesesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidadorMesesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
