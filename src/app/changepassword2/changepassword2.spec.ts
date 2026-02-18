import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Changepassword2 } from './changepassword2';

describe('Changepassword2', () => {
  let component: Changepassword2;
  let fixture: ComponentFixture<Changepassword2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Changepassword2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Changepassword2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
