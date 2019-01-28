import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLockerComponent } from './view-locker.component';

describe('ViewLockerComponent', () => {
  let component: ViewLockerComponent;
  let fixture: ComponentFixture<ViewLockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
