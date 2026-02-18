import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInvesterPage } from './new-invester-page';

describe('NewInvesterPage', () => {
  let component: NewInvesterPage;
  let fixture: ComponentFixture<NewInvesterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewInvesterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewInvesterPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
