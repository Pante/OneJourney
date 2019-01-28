import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElockerComponent } from './elocker.component';

describe('ElockerComponent', () => {
  let component: ElockerComponent;
  let fixture: ComponentFixture<ElockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElockerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
