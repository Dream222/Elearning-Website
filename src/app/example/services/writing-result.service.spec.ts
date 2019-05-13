import { TestBed, inject } from '@angular/core/testing';

import { WritingResultService } from './writing-result.service';

describe('WritingResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WritingResultService]
    });
  });

  it('should be created', inject([WritingResultService], (service: WritingResultService) => {
    expect(service).toBeTruthy();
  }));
});
