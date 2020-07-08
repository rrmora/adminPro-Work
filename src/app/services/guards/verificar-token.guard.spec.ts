import { TestBed, async, inject } from '@angular/core/testing';

import { VerificarTokenGuard } from './verificar-token.guard';

describe('VerificarTokenGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificarTokenGuard]
    });
  });

  it('should ...', inject([VerificarTokenGuard], (guard: VerificarTokenGuard) => {
    expect(guard).toBeTruthy();
  }));
});
