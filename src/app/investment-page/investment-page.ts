import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import {  OptionType } from '../services/option-type.service';
import { HttpClient } from '@angular/common/http';


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


  investmentAmount: number = 0;

  // Alert
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'error' | 'info' = 'info';

  selectedPayment: string = '';
  payoutType: string = '';
  paymentStatus: 'success' | 'failed' | null = null;

  options: OptionType[] = []; // <-- add this
  selectedOptionId?: number;  // <-- selected dropdown value

  constructor(
    private router: Router,
    private route: ActivatedRoute,
     private http: HttpClient
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
    this.loadOptions(); // <-- call method to fetch dropdown
  }
  loadOptions() {
    this.http.get<OptionType[]>('http://localhost:5048/api/OptionType/ActiveOptions') // <-- your API
      .subscribe({
        next: (data) => this.options = data,
        error: (err) => console.error('Error fetching options', err)
      });
  }

  goTo() {
    this.router.navigate(['/investor-page']);
  }
  // Method to show alert
  showCustomAlert(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    // Optional: auto-hide after 4 seconds
    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
  }
  goPay() {
    if (this.selectedPayment === 'gateway') {
      this.router.navigate(['/payment-page'], {
        queryParams: {
          amount: this.investmentAmount
        }
      });
    } else {
      this.showCustomAlert('Invest Request send Successful!', 'success');
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    }
  }


  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null = null;

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
  

  // Click anywhere on the document
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // If click is outside custom dropdowns, close them
    if (!target.closest('.custom-dropdown') && !target.closest('.dropdown-selected')) {
      this.investmentDropdownOpen = false;
      this.paymentDropdownOpen = false;
    }
  }
  //custom dropdown
  paymentDropdownOpen = false;

  togglePaymentDropdown() {
    this.paymentDropdownOpen = !this.paymentDropdownOpen;
  }

  selectPaymentMode(mode: string, event: Event) {
    
  }

  //for datbase drop
  // database dropdown

  investmentDropdownOpen = false;

  selectOption(option: OptionType, event: Event) {
  }

  getSelectedText(): string {
    const selected = this.options.find(
      o => o.optionTypeId === this.selectedOptionId
    );
    return selected ? selected.typeText : '';
  }
  //end
}


