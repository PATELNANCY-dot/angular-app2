import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 


@Component({
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login-otp.html',
  styleUrls: ['./login-otp.css']
})


export class LoginOtp {
  [x: string]: any;

  generatedOtp: string = '';

  constructor(private router: Router) {
    this.generateOtp();
  }

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
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid OTP ❌');
    }
  }




  moveNext(event: any) {
    const input = event.target;
    if (input.value && input.nextElementSibling) {
      input.nextElementSibling.focus();
    }
  }

  moveBack(event: any) {
    const input = event.target;
    if (!input.value && input.previousElementSibling) {
      input.previousElementSibling.focus();
    }
  }
}
