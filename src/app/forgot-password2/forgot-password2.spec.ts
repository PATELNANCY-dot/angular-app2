import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassword2 } from './forgot-password2';

describe('ForgotPassword2', () => {
  let component: ForgotPassword2;
  let fixture: ComponentFixture<ForgotPassword2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassword2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPassword2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
