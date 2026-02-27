import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './changepassword.html',
  styleUrls: ['./changepassword.css']
})
export class Changepassword {
  form: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  submit() {
    console.log('Form valid?', this.form.valid);
    console.log('Form value:', this.form.value);

    if (this.form.invalid) {
      this.message = 'Please fill all required fields';
      return;
    }

    if (this.form.value.newPassword !== this.form.value.confirmPassword) {
      this.message = 'New passwords do not match';
      return;
    }

    const clientId = localStorage.getItem('userId');
    console.log('clientId:', clientId);
    if (!clientId) {
      this.message = 'User not logged in';
      return;
    }

    const payload = {
      clientId: parseInt(clientId),
      currentPassword: this.form.value.currentPassword,
      newPassword: this.form.value.newPassword
    };

    this.http.post('http://localhost:5048/api/PasswordChange', payload)
      .subscribe({
        next: (res: any) => {
          console.log('API response:', res);
          this.message = res.message;
          if (res.message === 'Password changed successfully') {
            alert("Password Changed sucessfully")
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log('API error:', err);
          this.message = err.error?.message || 'Error changing password';
        }
      });
  }
 
}
