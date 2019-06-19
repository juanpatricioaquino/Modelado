import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieCHartComponent } from './pie-chart.component';

describe('PieCHartComponent', () => {
  let component: PieCHartComponent;
  let fixture: ComponentFixture<PieCHartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieCHartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieCHartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
