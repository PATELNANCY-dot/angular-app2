import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './forgot-password2.html',
  styleUrl: './forgot-password2.css',
})
export class ForgotPassword2 {

  constructor(private router: Router) {
    this.generateOtp();
  }

  [x: string]: any;

  generatedOtp: string = '';


  generateOtp() {
    this.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    alert('Your OTP is: ' + this.generatedOtp);
  }

  verifyOtp() {
    const inputs = document.querySelectorAll('.otp-input') as NodeListOf<HTMLInputElement>;
    let enteredOtp = '';

    inputs.forEach(input => {
      enteredOtp += input.value;
    });

    if (enteredOtp.length !== 6) {
      alert('Please enter complete OTP');
      return;
    }

    if (enteredOtp === this.generatedOtp) {
      alert('OTP Verified ✅');
      this.router.navigate(['/changepassword2']);
    } else {
      alert('Invalid OTP ❌');
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }

}
