import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleChooseResultsComponent } from './example-choose-results.component';

describe('ExampleChooseResultsComponent', () => {
  let component: ExampleChooseResultsComponent;
  let fixture: ComponentFixture<ExampleChooseResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleChooseResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleChooseResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
