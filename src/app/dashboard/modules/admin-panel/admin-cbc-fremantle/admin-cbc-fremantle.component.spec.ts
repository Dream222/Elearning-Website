import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCbcFremantleComponent } from './admin-cbc-fremantle.component';

describe('AdminCbcFremantleComponent', () => {
  let component: AdminCbcFremantleComponent;
  let fixture: ComponentFixture<AdminCbcFremantleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCbcFremantleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCbcFremantleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
