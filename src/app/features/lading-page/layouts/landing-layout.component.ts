import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, NgZone, QueryList, ViewChildren } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { LandingSection, NavbarComponent } from '../components/navbar/navbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './landing-layout.component.html',
})
export class LandingLayoutComponent {
  @ViewChildren('landingSection', { read: ElementRef })
  sections!: QueryList<ElementRef<HTMLElement>>;

  private router = inject(Router);
  private ngZone = inject(NgZone);

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.ngZone.runOutsideAngular(() => {
          setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
          }, 0);
        });
      });
  }
  scrollToSection(section: LandingSection) {
    const target = this.sections.find(
      (item) => item.nativeElement.getAttribute('data-section') === section,
    );

    if (!target) {
      console.warn('Section not found:', section);
      return;
    }

    target.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
