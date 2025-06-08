import { TestBed } from '@angular/core/testing';

import { AlerteSosService } from '../alerte-sos/alerte-sos.service';

describe('AlerteSosService', () => {
  let service: AlerteSosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlerteSosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
