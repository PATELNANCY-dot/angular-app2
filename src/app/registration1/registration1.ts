import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration1.html',
  styleUrls: ['./registration1.css'],
})
export class Registration1 {
  registrationForm: FormGroup;
   
  constructor(private router: Router, private fb: FormBuilder) {
     localStorage.removeItem('clientRegistration');
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      Password_1: ['', Validators.required],
    });

    const savedData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');
    this.registrationForm.patchValue(savedData);
  }

  goNext() {
    if (this.registrationForm.invalid) return;

    const existingData = JSON.parse(localStorage.getItem('clientRegistration') || '{}');
    const updatedData = { ...existingData, ...this.registrationForm.value };
    localStorage.setItem('clientRegistration', JSON.stringify(updatedData));

    this.router.navigate(['/registration2']);
  }
  goBack() {
    this.router.navigate(['/new-invester-page']);
  }
}
