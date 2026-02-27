import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-new-invester-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-invester-page.html',
  styleUrl: './new-invester-page.css',
})
export class NewInvesterPage {
  
  constructor(private router: Router) { }

  

  goTo() {
    this.router.navigate(['/registration1']);
  }
}
