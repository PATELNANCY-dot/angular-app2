import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registration1 } from './registration1';

describe('Registration1', () => {
  let component: Registration1;
  let fixture: ComponentFixture<Registration1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registration1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registration1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
