import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageSwitcherComponent } from '../../../../shared/components/language-switcher/language-switcher.component';
import { TranslatePipe } from '@ngx-translate/core';
import { SolutionsDropdownComponent } from './components/solutions-dropdown/solutions-dropdown.component';

export type LandingSection = 'about' | 'features' | 'pricing';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    CommonModule,
    LanguageSwitcherComponent,
    TranslatePipe,
    SolutionsDropdownComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() navClick = new EventEmitter<LandingSection>();

  private router = inject(Router);
  mobileMenuOpen = false;

  goToSection(section: LandingSection) {
    this.router.navigate(['/'], {
      fragment: section,
    });
  }

  goToAuth() {
    const hasToken = !!localStorage.getItem('accessToken');

    this.router.navigate([hasToken ? '/home' : '/auth/login']);
  }
}
