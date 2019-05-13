import { TestBed, async, inject } from '@angular/core/testing';

import { IsAreaExistsGuard } from './is-area-exists.guard';

describe('IsAreaExistsGuard', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [IsAreaExistsGuard]
        });
    });

    it('should ...', inject([IsAreaExistsGuard], (guard: IsAreaExistsGuard) =>
    {
        expect(guard).toBeTruthy();
    }));
});
