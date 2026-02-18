import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-invester-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './new-invester-page.html',
  styleUrl: './new-invester-page.css',
})
export class NewInvesterPage {
  activeMenu: string = 'dashboard';
  dropdownOpen: { [key: string]: boolean } = {};

  setActive(menu: string) {
    this.activeMenu = menu;
  }

  toggleDropdown(menu: string) {
    this.dropdownOpen[menu] = !this.dropdownOpen[menu];
  }

  logout() {
    console.log('Logging out...');
  }
  constructor(private router: Router) {
   
  }

  goTo() {
    this.router.navigate(['/registration1']);
  }
}
