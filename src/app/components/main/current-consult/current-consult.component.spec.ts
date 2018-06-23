import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentConsultComponent } from './current-consult.component';

describe('CurrentConsultComponent', () => {
  let component: CurrentConsultComponent;
  let fixture: ComponentFixture<CurrentConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
