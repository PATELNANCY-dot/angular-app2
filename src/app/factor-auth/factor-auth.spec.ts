import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorAuth } from './factor-auth';

describe('FactorAuth', () => {
  let component: FactorAuth;
  let fixture: ComponentFixture<FactorAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactorAuth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorAuth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
