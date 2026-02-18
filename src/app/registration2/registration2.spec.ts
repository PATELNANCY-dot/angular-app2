import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registration2 } from './registration2';

describe('Registration2', () => {
  let component: Registration2;
  let fixture: ComponentFixture<Registration2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registration2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registration2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
