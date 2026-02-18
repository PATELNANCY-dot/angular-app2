import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration2.html',
  styleUrls: ['./registration2.css'],
})
export class Registration2 {
  registrationForm: FormGroup;

  genders = ['Male', 'Female'];
  states = ['Gujarat', 'Mumbai', 'Rajasthan'];
  cities = ['Ahmedabad', 'Surat', 'Rajkot'];
  nationalities = ['India', 'USA', 'South Korea'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      pan: ['', Validators.required],
      dob: ['', Validators.required],
      aadhar: ['', Validators.required],
      nationality: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      correspondingAddress: ['', Validators.required],
      pincode: ['', Validators.required],
      gender: ['', Validators.required],
    });

    const savedData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');
    this.registrationForm.patchValue(savedData);
  }

  goNext() {
   
    const existingData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');
    const updatedData = { ...existingData, ...this.registrationForm.value };
    localStorage.setItem('clientRegistration', JSON.stringify(updatedData));

    this.router.navigate(['/registration3']);
  }

  goBack() {
    this.router.navigate(['/registration1']);
  }
}
