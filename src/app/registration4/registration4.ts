import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-registration4',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration4.html',
  styleUrls: ['./registration4.css'],
})
export class Registration4 {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      nomineeName: ['', Validators.required],
      nomineeRelation: ['', Validators.required],
      nomineeDob: ['', Validators.required],
      nomineePan: ['', Validators.required],
    });

    // Pre-fill form from localStorage if available
    const savedData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');
    this.registrationForm.patchValue(savedData);
  }

  submit() {
    if (this.registrationForm.invalid) return;

    const existingData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');

    const finalData = {
      Name: existingData.name || null,
      Email: existingData.email || null,
      Mobile: existingData.mobile || null,
      Pan: existingData.pan || null,
      Aadhar: existingData.aadhar  || null,
      Dob: existingData.dob ? new Date(existingData.dob).toISOString() : null,
      Gender: existingData.gender || null,
      PlaceOfBirth: existingData.placeOfBirth || null,
      Nationality: existingData.nationality || null,
      PermanentAddress: existingData.permanentAddress || null,
      Pincode: existingData.pincode || null,
      CorrespondingAddress: existingData.correspondingAddress || null,
      BankName: existingData.bankName || null,
      AccountNumber: existingData.accountNumber || null,
      BranchName: existingData.branchName || null,
      IfscCode: existingData.ifscCode || null,
      BranchAddress: existingData.branchAddress || null,
      MicrCode: existingData.micrCode || null,
      NomineeName: this.registrationForm.value.nomineeName,
      NomineeRelation: this.registrationForm.value.nomineeRelation,
      NomineeDob: this.registrationForm.value.nomineeDob
        ? new Date(this.registrationForm.value.nomineeDob).toISOString()
        : null,
      NomineePan: this.registrationForm.value.nomineePan,
    };
    const finalData1 = {
      Username: existingData.name,
      Password_1: existingData.Password_1,
    };


    console.log("Registration Data:", finalData);
    console.log("Login Data:", finalData1);


    forkJoin([
      this.http.post('http://localhost:5048/api/clientregistrations', finalData),
      this.http.post('http://localhost:5048/api/auth/store', finalData1)
    ]).subscribe({
      next: () => {
        alert('Registration successful!');
        localStorage.removeItem('clientRegistration');
        this.router.navigate(['/factor-auth']);
      },
      error: err => {
        console.error(err);
        alert('Something failed.');
      }
    });


  }
}
