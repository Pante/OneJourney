import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedSubmissionComponent } from './med-submission.component';

describe('MedSubmissionComponent', () => {
  let component: MedSubmissionComponent;
  let fixture: ComponentFixture<MedSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
