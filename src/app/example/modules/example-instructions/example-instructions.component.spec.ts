import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleInstructionsComponent } from './example-instructions.component';

describe('ExampleInstructionsComponent', () =>
{
    let component: ExampleInstructionsComponent;
    let fixture: ComponentFixture<ExampleInstructionsComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [ExampleInstructionsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(ExampleInstructionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
