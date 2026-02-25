import { Component } from '@angular/core';
import { Router, RouterLink, } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-investor-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './investor-page.html',
  styleUrls: ['./investor-page.css']
})
export class InvestorPage {


  showWithdrawPopup: boolean = false;
  withdrawAmount: number | null = null;
  selectedBank: string = '';


  constructor(private router: Router) { }

  openModal() {
    this.router.navigate(['/investment-page']);
  }

  goTo() {
    this.router.navigate(['/change-nominee']);
  }


  WithDraw() {
    alert('WithDrawal Request Send Successful!');
    this.showWithdrawPopup = false;
  }
}
