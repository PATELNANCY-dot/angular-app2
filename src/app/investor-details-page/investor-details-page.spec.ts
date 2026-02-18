import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorDetailsPage } from './investor-details-page';

describe('InvestorDetailsPage', () => {
  let component: InvestorDetailsPage;
  let fixture: ComponentFixture<InvestorDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestorDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
