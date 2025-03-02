import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
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
  @Output() logoutEvent = new EventEmitter<void>();
  @Output() externalLogin = new EventEmitter<void>();

  constructor(private router: Router) {}
  //private router = inject(Router);

  navigateTo(route: string, event: Event) {
    if (event) {
      event.preventDefault(); // Prevent default anchor link behavior
    }
    this.router.navigate([route]);
  }

  triggerSSOLogin(event: Event) {
    event.preventDefault();
    this.ssoLogin.emit();
  }

triggerExternalLogin(event: Event) {
    event.preventDefault();
    this.externalLogin.emit();
  }

  logout(event: Event) {
    event.preventDefault();
    this.logoutEvent.emit();
  }
}
