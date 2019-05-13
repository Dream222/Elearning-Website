import { TestBed, async, inject } from '@angular/core/testing';

import { IsUserHaveAccessGuard } from './is-user-have-access.guard';

describe('IsUserHaveAccessGuard', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [IsUserHaveAccessGuard]
        });
    });

    it('should ...', inject([IsUserHaveAccessGuard], (guard: IsUserHaveAccessGuard) =>
    {
        expect(guard).toBeTruthy();
    }));
});
