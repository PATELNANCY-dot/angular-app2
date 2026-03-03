import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './payment-page.html',
  styleUrls: ['./payment-page.css']
})
export class PaymentPage {

  paymentType: string = '';
  paymentModeFromInvestment: string = '';
  payoutType: string = '';

  amount: number = 10000;
  transactionId: string = ''; // will be generated dynamically
  selectedPayment: string = '';
  showConfirm: boolean = false;

  activeDropdown: string | null = null;
  mhpDropdownOpen: boolean = false;
  paymentModeDropdownOpen: boolean = false;
  languageDropdownOpen: boolean = false;

  languages: string[] = ['English', 'Hindi', 'Gujarati'];
  selectedLanguage: string = 'English';
  selectedOptionId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['amount']) this.amount = Number(params['amount']);
      if (params['paymentType']) this.paymentType = params['paymentType'];
      if (params['paymentMode']) this.paymentModeFromInvestment = params['paymentMode'];
      if (params['payoutType']) this.payoutType = params['payoutType'];
      if (params['option1']) this.selectedOptionId = params['option1'];

      console.log('Amount:', this.amount);
      console.log('Payment Type:', this.paymentType);
      console.log('Payment Mode:', this.paymentModeFromInvestment);
      console.log('Payout Type:', this.payoutType);
      console.log('Option ID:', this.selectedOptionId);
    });
  }

  // -----------------------------
  // Generate transaction ID dynamically
  // -----------------------------
  generateTransactionId(): string {
    const now = new Date();
    const datePart = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14); // YYYYMMDDHHMMSS
    const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
    return `TXN-${datePart}-${randomPart}`;
  }

  // -----------------------------
  // Payment Methods
  // -----------------------------
  continuePayment() {
    this.transactionId = this.generateTransactionId();

    const storedClientId = localStorage.getItem('userId');
    const clientId = storedClientId ? Number(storedClientId) : 0;

    const queryParams = this.route.snapshot.queryParams;

    const request = {
      clientId: clientId,
      transactionId: this.transactionId,
      amount: this.amount,
      paymentMode: this.paymentModeFromInvestment || this.selectedPayment || 'Gateway',
      paymentType: this.paymentType || 'Gateway',
      payoutType: this.payoutType || queryParams['payoutType'] || '',
      MHP: queryParams['MHP'] || '',
      option1: queryParams['option1'] || '',
      status: 'success'
    };

    this.transactionService.createTransaction(request).subscribe({
      next: () => {
        alert('Transaction Successful!'); // popup confirmation
        this.router.navigate(['/transaction-status'], {
          queryParams: {
            status: 'success',
            amount: this.amount,
            txn: this.transactionId
          }
        });
      },
      error: (err) => {
        console.error('Transaction Save Failed', err);
        alert('Transaction Failed!'); // popup for failure
        this.router.navigate(['/transaction-status'], {
          queryParams: {
            status: 'failed',
            amount: this.amount,
            txn: this.transactionId
          }
        });
      }
    });
  }

  cancelPayment() {
    this.transactionId = this.generateTransactionId();

    const storedClientId = localStorage.getItem('userId');
    const clientId = storedClientId ? Number(storedClientId) : 0;

    const queryParams = this.route.snapshot.queryParams;

    const request = {
      clientId: clientId,
      transactionId: this.transactionId,
      amount: this.amount,
      paymentMode: this.paymentModeFromInvestment || this.selectedPayment || 'Gateway',
      paymentType: this.paymentType || 'Gateway',
      payoutType: this.payoutType || queryParams['payoutType'] || '',
      MHP: queryParams['MHP'] || '',
      option1: queryParams['option1'] || '',
      status: 'failed'
    };

    this.transactionService.createTransaction(request).subscribe(() => {
      alert('Transaction Cancelled!');
      this.router.navigate(['/transaction-status'], {
        queryParams: {
          status: 'failed',
          amount: this.amount,
          txn: this.transactionId
        }
      });
    });
  }

  back() {
    this.router.navigate(['/investment-page']);
  }

  // -----------------------------
  // Custom Dropdown Methods
  // -----------------------------
  toggleLanguageDropdown(event: Event) {
    event.stopPropagation();
    this.languageDropdownOpen = !this.languageDropdownOpen;
  }

  selectLanguage(lang: string, event: Event) {
    event.stopPropagation();
    this.selectedLanguage = lang;
    this.languageDropdownOpen = false;
  }

  toggleMhpDropdown(event: Event) {
    event.stopPropagation();
    this.mhpDropdownOpen = !this.mhpDropdownOpen;
  }

  togglePaymentModeDropdown(event: Event) {
    event.stopPropagation();
    this.paymentModeDropdownOpen = !this.paymentModeDropdownOpen;
  }

  selectMhp(period: string, event: Event) {
    event.stopPropagation();
    this.mhpDropdownOpen = false;
    this.selectedPayment = period;
  }

  selectPaymentMode(mode: string, event: Event) {
    event.stopPropagation();
    this.paymentModeDropdownOpen = false;
    this.selectedPayment = mode;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown') && !target.closest('.language-dropdown')) {
      this.activeDropdown = null;
      this.mhpDropdownOpen = false;
      this.paymentModeDropdownOpen = false;
      this.languageDropdownOpen = false;
    }
  }

}
