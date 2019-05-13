import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsSignUpComponent } from './schools-sign-up.component';

describe('SchoolsSignUpComponent', () =>
{
    let component: SchoolsSignUpComponent;
    let fixture: ComponentFixture<SchoolsSignUpComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [SchoolsSignUpComponent]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SchoolsSignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
