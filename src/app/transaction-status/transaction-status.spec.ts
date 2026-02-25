import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionStatus } from './transaction-status';

describe('TransactionStatus', () => {
  let component: TransactionStatus;
  let fixture: ComponentFixture<TransactionStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
