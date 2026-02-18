import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorPage } from './investor-page';

describe('InvestorPage', () => {
  let component: InvestorPage;
  let fixture: ComponentFixture<InvestorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestorPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
