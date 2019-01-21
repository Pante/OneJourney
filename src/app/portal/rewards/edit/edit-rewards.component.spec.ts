import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRewardsComponent } from './edit-rewards.component';

describe('EditRewardsComponent', () => {
  let component: EditRewardsComponent;
  let fixture: ComponentFixture<EditRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
