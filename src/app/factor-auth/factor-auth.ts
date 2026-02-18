import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-factor-auth',
  standalone: true,
  imports: [FormsModule], // Only modules here
  templateUrl: './factor-auth.html',
  styleUrls: ['./factor-auth.css'],        
})
export class FactorAuth {
  dob: string = ''; 
  pan: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  submit() {
    // Simple validation
    if (!this.dob || !this.pan) {
      alert('Please fill both fields.');
      return;
    }

    this.http.post('http://localhost:5048/api/TwoFactorAuth', { Dob: this.dob, Pan: this.pan })
      .subscribe({
        next: res => {
          alert('Verified Sucessfully');
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          alert('Invalid DOB or PAN');
        }
      });
  }
}
