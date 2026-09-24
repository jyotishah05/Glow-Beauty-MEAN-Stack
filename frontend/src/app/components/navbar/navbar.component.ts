import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header>
      <nav class="navbar">
        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
          <li><a routerLink="/products" routerLinkActive="active">Products</a></li>
          <li><a routerLink="/about" routerLinkActive="active">About Us</a></li>
          <li><a routerLink="/contact" routerLinkActive="active">Contact Us</a></li>
          <li><a routerLink="/faq" routerLinkActive="active">FAQ</a></li>
          <li><a routerLink="/admin" routerLinkActive="active">Admin</a></li>
        </ul>
      </nav>
    </header>
  `
})
export class NavbarComponent {}
