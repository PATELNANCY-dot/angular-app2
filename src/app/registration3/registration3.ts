import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration3.html',
  styleUrls: ['./registration3.css'],
})
export class Registration3 {
  registrationForm: FormGroup;

  banks: any[] = [];
  bankBranches: any[] = [];
 
  apiUrl = 'http://localhost:5048/api/ifscMaster';

  ngOnInit() {



    this.loadBanks();
    this.registrationForm.get('bankName')?.valueChanges.subscribe(bankId => {

      // Clear branch and auto-filled fields
      this.bankBranches = [];
      this.registrationForm.patchValue({
        branchName: '',
        ifscCode: '',
        micrCode: '',
        branchAddress: ''
      });

      if (bankId) {
        this.loadBranches(bankId);
      }

    });


    this.registrationForm.get('branchName')?.valueChanges.subscribe(branchId => {
      if (branchId) {

        const selectedBranch = this.bankBranches.find(b => b.id == branchId);

        if (selectedBranch) {
          this.registrationForm.patchValue({
            ifscCode: selectedBranch.ifscCode,
            micrCode: selectedBranch.micrCode,
            branchAddress: selectedBranch.bankAddress
          });
        }

      }
    });

  }

 
  loadBranches(bankId: number) {
    this.http.get<any[]>(
      `${this.apiUrl}/branches/${bankId}`
    ).subscribe(data => {
      this.bankBranches = data;
    });
  }

  loadBanks() {
    this.http.get<any[]>('http://localhost:5048/api/Bank')
      .subscribe(data => {
        this.banks = data;
      });
  }



  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      bankName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      branchName: ['', Validators.required],
      ifscCode: [{ value: '', disabled: true }],
      micrCode: [{ value: '', disabled: true }],
      branchAddress: [{ value: '', disabled: true }]
    });


  }

  goNext() {
    if (this.registrationForm.invalid) return;

    const formData = this.registrationForm.getRawValue();

    // Find selected bank name
    const selectedBank = this.banks.find(
      b => b.bankId == formData.bankName
    );

    // Find selected branch name
    const selectedBranch = this.bankBranches.find(
      b => b.id == formData.branchName
    );

    const updatedData = {
      ...JSON.parse(localStorage.getItem('clientRegistration') || '{}'),
      ...formData,
      bankName: selectedBank ? selectedBank.bankName : '',
      branchName: selectedBranch ? selectedBranch.bankBranch : ''
    };

    localStorage.setItem('clientRegistration', JSON.stringify(updatedData));

    this.router.navigate(['/registration4']);
  }

  goBack() {
    this.router.navigate(['/registration2']);
  }
}
