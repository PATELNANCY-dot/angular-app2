import { Component } from '@angular/core';
import { NavBar } from '../shared/nav-bar/nav-bar';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBar, RouterOutlet, CommonModule],
  template: `
    <app-nav-bar></app-nav-bar>  <!-- Navbar shown once -->
    <router-outlet></router-outlet> <!-- Page content changes -->
  `
})
export class MainLayoutComponent {

}
