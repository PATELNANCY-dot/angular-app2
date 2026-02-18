import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-nominee',
  standalone: true,
  imports: [],
  templateUrl: './change-nominee.html',
  styleUrl: './change-nominee.css',
})
export class ChangeNominee {
  constructor(private router: Router) { }
  goNext() {
    alert('Nominee Add Successful!');
    this.router.navigate(['/dashboard']);
  }
}
