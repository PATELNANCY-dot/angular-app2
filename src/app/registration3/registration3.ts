import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registration3',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './registration3.html',
  styleUrls: ['./registration3.css'],
})
export class Registration3 {
  registrationForm: FormGroup;

  banks = ['Bank of Baroda', 'HDFC Bank', 'Axis Bank'];
  branches = ['Vastrapur', 'Odhav', 'Naroda'];

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      bankName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      branchName: ['', Validators.required],
      ifscCode: ['', Validators.required],
      branchAddress: ['', Validators.required],
      micrCode: ['', Validators.required],
    });

    const savedData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');
    this.registrationForm.patchValue(savedData);
  }

  goNext() {
    if (this.registrationForm.invalid) return;

    const existingData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');
    const updatedData = { ...existingData, ...this.registrationForm.value };
    localStorage.setItem('clientRegistration', JSON.stringify(updatedData));

    this.router.navigate(['/registration4']);
  }

  goBack() {
    this.router.navigate(['/registration2']);
  }
}
