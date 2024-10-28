/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CovoiturageService } from './covoiturage.service';

describe('Service: Covoiturage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CovoiturageService]
    });
  });

  it('should ...', inject([CovoiturageService], (service: CovoiturageService) => {
    expect(service).toBeTruthy();
  }));
});
