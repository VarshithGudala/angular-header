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

  private router = inject(Router);

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  triggerSSOLogin(event: Event) {
    event.preventDefault();
    this.ssoLogin.emit();
  }

  logout() {
    this.logoutEvent.emit();
  }
}
