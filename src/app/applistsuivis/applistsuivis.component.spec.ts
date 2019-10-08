import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplistsuivisComponent } from './applistsuivis.component';

describe('ApplistsuivisComponent', () => {
  let component: ApplistsuivisComponent;
  let fixture: ComponentFixture<ApplistsuivisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplistsuivisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplistsuivisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
