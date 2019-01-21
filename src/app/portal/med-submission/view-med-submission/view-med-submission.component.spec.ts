import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedSubmissionComponent } from './view-med-submission.component';

describe('ViewMedSubmissionComponent', () => {
  let component: ViewMedSubmissionComponent;
  let fixture: ComponentFixture<ViewMedSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMedSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMedSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
