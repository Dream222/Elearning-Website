import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAnswerComponent } from './choose-answer.component';

describe('ChooseAnswerComponent', () =>
{
    let component: ChooseAnswerComponent;
    let fixture: ComponentFixture<ChooseAnswerComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [ChooseAnswerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(ChooseAnswerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
