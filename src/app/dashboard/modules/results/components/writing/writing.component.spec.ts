import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleWritingResultsComponent } from './example-writing-results.component';

describe('ExampleWritingResultsComponent', () => {
  let component: ExampleWritingResultsComponent;
  let fixture: ComponentFixture<ExampleWritingResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleWritingResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleWritingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
