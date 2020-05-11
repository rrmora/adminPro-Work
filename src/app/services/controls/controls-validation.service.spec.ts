import { TestBed } from '@angular/core/testing';

import { ControlsValidationService } from './controls-validation.service';

describe('ControlsValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlsValidationService = TestBed.get(ControlsValidationService);
    expect(service).toBeTruthy();
  });
});
