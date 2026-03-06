import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-dashboard',
  imports: [ CommonModule ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  loading: boolean = true;

  constructor(private router: Router) { } 

  ngOnInit() {
    // Simulate a loading delay (e.g., fetching data)
    
      this.loading = false;
     // 3 seconds
  }

  invest() {
    const userId = localStorage.getItem('userId');
    if (userId === null) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/investor-page']);
    }
  
  }
}
