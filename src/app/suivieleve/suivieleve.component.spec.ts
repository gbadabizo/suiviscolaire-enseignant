import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivieleveComponent } from './suivieleve.component';

describe('SuivieleveComponent', () => {
  let component: SuivieleveComponent;
  let fixture: ComponentFixture<SuivieleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuivieleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuivieleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
