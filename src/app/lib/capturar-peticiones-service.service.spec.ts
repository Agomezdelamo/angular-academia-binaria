import { TestBed, inject } from '@angular/core/testing';

import { CapturarPeticionesServiceService } from './capturar-peticiones-service.service';

describe('CapturarPeticionesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CapturarPeticionesServiceService]
    });
  });

  it('should be created', inject([CapturarPeticionesServiceService], (service: CapturarPeticionesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
