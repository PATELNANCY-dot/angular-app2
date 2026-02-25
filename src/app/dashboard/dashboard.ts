import { Component } from '@angular/core';
import { RouterLink, } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CommonModule ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(private router: Router) { } 

 

  invest() {
    const userId = localStorage.getItem('userId');
    if (userId === null) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/investor-page']);
    }
  
  }
}
