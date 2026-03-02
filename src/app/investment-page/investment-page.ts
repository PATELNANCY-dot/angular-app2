import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { OptionType } from '../services/option-type.service';
import { HttpClient } from '@angular/common/http';
import { AccountDetails } from '../models/account-details.model';

@Component({
  selector: 'app-investment-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './investment-page.html',
  styleUrls: ['./investment-page.css'],
})
export class InvestmentPage implements OnInit {



  account?: AccountDetails;
  errorMessage: string = '';
  isLoading: boolean = true;

  private apiUrl: string = 'http://localhost:5048/api/AccountDetails';

  // -----------------------------
  // Investment & Payment State
  // -----------------------------
  investmentAmount: number = 0;
  selectedPayment: string = ''; // gateway or neft
  payoutType: string = '';       // Payout type dropdown (custom)
  paymentMode: string = '';      // Payment mode dropdown (custom)
  paymentStatus: 'success' | 'failed' | null = null;

  // -----------------------------
  // Alert Handling
  // -----------------------------
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' | 'info' = 'info';

  // -----------------------------
  // Database-driven Options
  // -----------------------------
  options: OptionType[] = [];       // Dropdown options from DB
  selectedOptionId?: number;        // Selected option ID

  // -----------------------------
  // Custom Dropdown States
  // -----------------------------
  activeDropdown: string | null = null;       // Generic dropdown toggle
  mhpDropdownOpen = false;                    // Minimum Holding Period dropdown
  paymentModeDropdownOpen = false;            // Payment mode dropdown

  // -----------------------------
  // File Upload Handling
  // -----------------------------
  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null = null;
    cdr: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    const storedClientId = localStorage.getItem('userId');
    console.log('Stored Client ID:', storedClientId);

    if (!storedClientId) {
      this.errorMessage = 'No user found. Please login.';
      this.isLoading = false;
      this.router.navigate(['/login']);
      return;
    }

    const clientId = Number(storedClientId);
    if (isNaN(clientId)) {
      this.errorMessage = 'Invalid user ID. Please login again.';
      this.isLoading = false;
      this.router.navigate(['/login']);
      return;
    }

    this.loadAccount(clientId);

    // Check query params for payment status
    this.route.queryParams.subscribe(params => {
      if (params['status']) {
        this.paymentStatus = params['status'];

        // Remove query params from URL
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {},
          replaceUrl: true
        });
      }
    });

    // Fetch options from database
    this.loadOptions();
  }

  // -----------------------------
  // Database Fetch for Options
  // -----------------------------
  loadOptions() {
    this.http.get<OptionType[]>('http://localhost:5048/api/OptionType/ActiveOptions')
      .subscribe({
        next: (data) => this.options = data,
        error: (err) => console.error('Error fetching options', err)
      });
  }

  getSelectedText(): string {
    const selected = this.options.find(o => o.optionTypeId === this.selectedOptionId);
    return selected ? selected.typeText : '';
  }

  selectOption(option: OptionType, event: Event) {
    event.stopPropagation();
    this.selectedOptionId = option.optionTypeId;
    this.activeDropdown = null;
  }

  // -----------------------------
  // Alert Methods
  // -----------------------------
  showCustomAlert(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
  }

  // -----------------------------
  // Navigation
  // -----------------------------
  goTo() {
    this.router.navigate(['/investor-page']);
  }

  goPay() {
    if (this.selectedPayment === 'gateway') {
      this.router.navigate(['/payment-page'], { queryParams: { amount: this.investmentAmount } });
    } else {
      this.showCustomAlert('Invest Request sent Successfully!', 'success');
      setTimeout(() => this.router.navigate(['/dashboard']), 2000);
    }
  }

  // -----------------------------
  // File Upload Methods
  // -----------------------------
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => this.filePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.filePreview = null;

    const input = document.getElementById('receiptUpload') as HTMLInputElement;
    if (input) input.value = '';
  }

  openFile() {
    if (this.filePreview) {
      const win = window.open();
      if (win) {
        win.document.write(`<iframe src="${this.filePreview}" frameborder="0" style="width:100%;height:100%;"></iframe>`);
      }
    }
  }

  // -----------------------------
  // Custom Dropdown Handling
  // -----------------------------
  toggleDropdown(name: string, event: Event) {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === name ? null : name;
  }

  toggleMhpDropdown(event: Event) {
    event.stopPropagation();
    this.mhpDropdownOpen = !this.mhpDropdownOpen;
  }

  togglePaymentModeDropdown(event: Event) {
    event.stopPropagation();
    this.paymentModeDropdownOpen = !this.paymentModeDropdownOpen;
  }

  selectPayoutType(type: string, event: Event) {
    event.stopPropagation();
    this.payoutType = type;
    this.activeDropdown = null;
  }

  selectPaymentMode(mode: string, event: Event) {
    event.stopPropagation();
    this.paymentMode = mode;
    this.paymentModeDropdownOpen = false;
  }

  selectMhp(period: string, event: Event) {
    event.stopPropagation();
    this.mhpDropdownOpen = false;
    this.payoutType = period; // or a separate variable for MHP
  }

  // -----------------------------
  // Close dropdown when click outside
  // -----------------------------
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.custom-dropdown')) {
      this.activeDropdown = null;
      this.mhpDropdownOpen = false;
      this.paymentModeDropdownOpen = false;
    }
  }


  ///load account details
  loadAccount(clientId: number) {
    this.isLoading = true;

    this.http.get<AccountDetails>(`${this.apiUrl}/account/${clientId}`).subscribe({
      next: (data) => {
        this.account = data;
        console.log('Account loaded:', data);
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- force Angular to refresh view

      },
      error: (err) => {
        console.error('Error fetching account:', err);
        this.errorMessage = 'Unable to load account details.';
        this.isLoading = false;
      }
    });
  }

}
