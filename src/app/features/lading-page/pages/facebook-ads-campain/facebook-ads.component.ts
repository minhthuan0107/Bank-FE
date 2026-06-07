import { Component, inject } from '@angular/core';
import { NavigateService } from '../../../../shared/services/navigate.service';
import { HeroComponent } from './components/hero/hero.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RedGlowCtaComponent } from './components/red-glow-cta/red-glow-cta.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { WhyFacebookVccComponent } from './components/why-facebook-vcc/why-facebook-vcc.component';

@Component({
  selector: 'app-facebook-ads',
  imports: [
    HeroComponent,
    OverviewComponent,
    RedGlowCtaComponent,
    RedGlowCtaComponent,
    HowItWorksComponent,
    WhyFacebookVccComponent,
  ],
  templateUrl: './facebook-ads.component.html',
  styleUrl: './facebook-ads.component.scss',
})
export class FacebookAdsComponent {
  protected navigateService = inject(NavigateService);
}
