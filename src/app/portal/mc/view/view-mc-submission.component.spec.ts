import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMCSubmissionComponent } from './view-mc-submission.component';

describe('ViewMCSubmissionComponent', () => {
  let component: ViewMCSubmissionComponent;
  let fixture: ComponentFixture<ViewMCSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMCSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMCSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
