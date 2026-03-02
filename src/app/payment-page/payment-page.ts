import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

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

  // Payment State
  amount: number = 10000;
  transactionId: string = 'TXN123456';
  selectedPayment: string = '';
  showConfirm: boolean = false;


  // Custom Dropdowns

  activeDropdown: string | null = null;       // Generic dropdown toggle
  mhpDropdownOpen: boolean = false;           // Minimum Holding Period dropdown
  paymentModeDropdownOpen: boolean = false;   // Payment mode dropdown
  languageDropdownOpen: boolean = false;      // Language selector dropdown


  // Language Selector

  languages: string[] = ['English', 'Hindi', 'Gujarati'];
  selectedLanguage: string = 'English';

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

  // Payment Methods

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

  back() {
    this.router.navigate(['/investment-page']);
  }

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
    // Save MHP selection if needed
    this.selectedPayment = period; // or use separate variable
  }

  selectPaymentMode(mode: string, event: Event) {
    event.stopPropagation();
    this.paymentModeDropdownOpen = false;
    this.selectedPayment = mode;
  }

  // -----------------------------
  // Close dropdowns when clicking outside
  // -----------------------------
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
