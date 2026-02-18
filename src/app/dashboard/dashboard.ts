import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
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
}
