import { TestBed, inject } from '@angular/core/testing';

import { AllQuestionsService } from './all-questions.service';

describe('AllQuestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllQuestionsService]
    });
  });

  it('should be created', inject([AllQuestionsService], (service: AllQuestionsService) => {
    expect(service).toBeTruthy();
  }));
});
