import { Component } from '@angular/core';

@Component({
  selector: 'lib-header',
  standalone: true,
  template: `<header><h1>My Header Component</h1></header>`,
  styles: [`header { background: #6200ea; color: white; padding: 1rem; text-align: center; }`]
})
export class HeaderComponent {}
