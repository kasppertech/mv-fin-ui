import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mv-finan-ui';
  mobileMenuActive: boolean;


  constructor(
    private router: Router,
  ) {
  }


  exibindoNavbar() {
    return this.router.url !== '/login';
  }

  onMobileMenuButton (event) {
    this.mobileMenuActive = !this.mobileMenuActive;
    event.preventDefault();
  }

  hideMobileMenu(event) {
    this.mobileMenuActive = false;
    event.preventDefault();
  }


}
