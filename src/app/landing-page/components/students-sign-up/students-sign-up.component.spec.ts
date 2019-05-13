import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsSignUpComponent } from './students-sign-up.component';

describe('StudentsSignUpComponent', () =>
{
    let component: StudentsSignUpComponent;
    let fixture: ComponentFixture<StudentsSignUpComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [StudentsSignUpComponent]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(StudentsSignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
