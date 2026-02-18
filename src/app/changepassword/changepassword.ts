import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './changepassword.html',
  styleUrls: ['./changepassword.css']
})
export class Changepassword {
  constructor(private router: Router) { }
  goNext() {
    alert('Password Change Successful!');
    this.router.navigate(['/dashboard']);
  }

}
