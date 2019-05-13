import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeracyComponent } from './numeracy.component';

describe('NumeracyComponent', () => {
  let component: NumeracyComponent;
  let fixture: ComponentFixture<NumeracyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumeracyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
