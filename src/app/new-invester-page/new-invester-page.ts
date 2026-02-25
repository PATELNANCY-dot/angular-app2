import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-new-invester-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './new-invester-page.html',
  styleUrl: './new-invester-page.css',
})
export class NewInvesterPage {
  
  constructor(private router: Router) { }

  

  goTo() {
    this.router.navigate(['/registration1']);
  }
}
