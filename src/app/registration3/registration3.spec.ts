import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registration3 } from './registration3';

describe('Registration3', () => {
  let component: Registration3;
  let fixture: ComponentFixture<Registration3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registration3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registration3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
