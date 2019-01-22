import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MCSubmissionComponent } from './mc-submission.component';

describe('MCSubmissionComponent', () => {
  let component: MCSubmissionComponent;
  let fixture: ComponentFixture<MCSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MCSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MCSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
