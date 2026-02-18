import { Component } from '@angular/core';
import { Router} from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  constructor(private router: Router) {

  }
  goBack() {
    this.router.navigate(['/login']);
  }
  goNext() {
    this.router.navigate(['/forgot-password2']);
  }
}
