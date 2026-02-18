import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registration4 } from './registration4';

describe('Registration4', () => {
  let component: Registration4;
  let fixture: ComponentFixture<Registration4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registration4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registration4);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
