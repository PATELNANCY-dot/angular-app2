import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeNominee } from './change-nominee';

describe('ChangeNominee', () => {
  let component: ChangeNominee;
  let fixture: ComponentFixture<ChangeNominee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeNominee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeNominee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
