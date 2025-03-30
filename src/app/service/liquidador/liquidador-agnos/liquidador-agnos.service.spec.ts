import { TestBed } from '@angular/core/testing';

import { LiquidadorAgnosService } from './liquidador-agnos.service';

describe('LiquidadorMesesService', () => {
  let service: LiquidadorAgnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidadorAgnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
