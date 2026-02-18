import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-investment-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './investment-page.html',
  styleUrls: ['./investment-page.css']
})
export class InvestmentPage implements OnInit {

  selectedPayment: string = '';
  payoutType: string = '';
  paymentStatus: 'success' | 'failed' | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      if (params['status']) {
        this.paymentStatus = params['status'];

        // Remove query param immediately
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {},
          replaceUrl: true
        });
      }

    });
  }

  goTo() {
    this.router.navigate(['/investor-page']);
  }

  goPay() {
    this.router.navigate(['/payment-page']);
  }
}
