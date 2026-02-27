import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   //  ADD THIS
import { RouterModule, Router, ActivatedRoute } from '@angular/router'; //  ADD RouterModule

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,        //  VERY IMPORTANT
    RouterModule        //  Needed for routerLink
  ],
  templateUrl: './payment-page.html',
  styleUrls: ['./payment-page.css']
})
export class PaymentPage {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['amount']) {
        this.amount = Number(params['amount']);
      }
    });
  }

  amount: number = 10000;
  transactionId: string = 'TXN123456';
  selectedPayment: string = '';
  showConfirm: boolean = false;


  continuePayment() {
    this.router.navigate(['/transaction-status'], {
      queryParams: {
        status: 'success',
        amount: this.amount,
        txn: this.transactionId
      }
    });
  }

  cancelPayment() {
    this.router.navigate(['/transaction-status'], {
      queryParams: {
        status: 'failed',
        amount: this.amount,
        txn: this.transactionId
      }
    });
  }
}
