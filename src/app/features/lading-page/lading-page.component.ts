import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { LowFeesComponent } from './components/low-fees/low-fees.component';
import { ManageAssetsComponent } from './components/manage-assets/manage-assets.component';
import { FeaturesComponent } from './components/features/features.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutWalletComponent } from './components/about-wallet/about-wallet.component';
import { TranslatePipe } from '@ngx-translate/core';
import { PaymentScenariosComponent } from './components/payment-scenarios/payment-scenarios.component';

type LandingSection = 'hero' | 'about' | 'features';

@Component({
  selector: 'app-landing-page',
  imports: [
    HeroComponent,
    LowFeesComponent,
    ManageAssetsComponent,
    FeaturesComponent,
    DashboardComponent,
    AboutWalletComponent,
    TranslatePipe,
    PaymentScenariosComponent,
  ],
  templateUrl: './landing-page.componet.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements AfterViewInit {
  private el = inject(ElementRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @ViewChildren('landingSection', { read: ElementRef })
  sections!: QueryList<ElementRef<HTMLElement>>;

  goToAuth() {
    const hasToken = !!localStorage.getItem('accessToken');
    const redirectUrl = hasToken ? '/home' : '/auth/login';
    this.router.navigate([redirectUrl]);
  }

  ngAfterViewInit(): void {
    this.initRevealAnimation();
    this.handleFragmentScroll();
  }

  private handleFragmentScroll() {
    setTimeout(() => {
      const fragment = this.route.snapshot.fragment;

      if (fragment) {
        this.scrollToSection(fragment as LandingSection);
      }
    }, 150);

    this.route.fragment.subscribe((fragment) => {
      if (!fragment) return;

      setTimeout(() => {
        this.scrollToSection(fragment as LandingSection);
      }, 150);
    });
  }

  private scrollToSection(section: LandingSection) {
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

  private initRevealAnimation() {
    const elements = this.el.nativeElement.querySelectorAll('.reveal');
    const navbar = document.querySelector('.navbar');

    if (navbar) {
      setTimeout(() => {
        navbar.classList.add('show');
      }, 200);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    elements.forEach((el: Element) => observer.observe(el));
  }
}
