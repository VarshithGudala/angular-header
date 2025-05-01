import { Component, EventEmitter, Output, Input, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() userName: string = '';
  @Input() isLoggedIn: boolean = false;
  @Output() ssoLogin = new EventEmitter<void>();
  @Output() googleLogin = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();

  // Track mobile menu state
  mobileMenuOpen: boolean = false;

  constructor(private router: Router) {}

  navigateTo(route: string, event: Event) {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate([route]);

    // Close mobile menu when navigating
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  triggerSSOLogin(event: Event) {
    event.preventDefault();
    this.ssoLogin.emit();
    this.closeMobileMenu();
  }

  triggerGoogleLogin(event: Event) {
    event.preventDefault();
    this.googleLogin.emit();
    this.closeMobileMenu();
  }

  logout(event: Event) {
    event.preventDefault();
    this.logoutEvent.emit();
    this.closeMobileMenu();
  }

  // Get first letter of user's name for avatar
  getFirstLetter(): string {
    return this.userName && this.userName.length > 0 ? this.userName.charAt(0).toUpperCase() : '';
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    // Prevent scrolling when menu is open
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  // Listen for window resize event to close menu on desktop
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth > 768 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}
