import { TestBed, inject } from '@angular/core/testing';

import { LoadingHandlerService } from './loading-handler.service';

describe('LoadingHandlerService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [LoadingHandlerService]
        });
    });

    it('should be created', inject([LoadingHandlerService], (service: LoadingHandlerService) =>
    {
        expect(service).toBeTruthy();
    }));
});
