import { TestBed } from '@angular/core/testing';

import { SemanaService } from './semana.service';

describe('SemanaService', () => {
  let service: SemanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
