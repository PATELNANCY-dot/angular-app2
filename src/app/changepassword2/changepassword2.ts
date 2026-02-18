import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-changepassword2',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './changepassword2.html',
  styleUrls: ['./changepassword2.css']
})
export class Changepassword2 {
  constructor(private router: Router) { }
  goBack() {
    this.router.navigate(['/login']);
  }
  goNext() {
    alert('Password Change Successful!');
    this.router.navigate(['/login']);
  }

}
