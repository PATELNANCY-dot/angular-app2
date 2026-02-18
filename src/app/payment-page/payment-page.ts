import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // ✅ ADD THIS
import { RouterModule, Router } from '@angular/router'; // ✅ ADD RouterModule

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,        // ✅ VERY IMPORTANT
    RouterModule        // ✅ Needed for routerLink
  ],
  templateUrl: './payment-page.html',
  styleUrls: ['./payment-page.css']
})
export class PaymentPage {

  amount: number = 10000;
  transactionId: string = 'TXN123456';
  selectedPayment: string = '';
  showConfirm: boolean = false;

  constructor(private router: Router) { }

  continuePayment() {
    this.router.navigate(['/investment-page'], {
      queryParams: { status: 'success' }
    });
  }

  cancelPayment() {
    this.router.navigate(['/investment-page'], {
      queryParams: { status: 'failed' }
    });
  }
}
