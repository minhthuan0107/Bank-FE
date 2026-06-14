import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { OverviewComponent } from './components/overview/overview.component';
import { HowItWorksComponent } from '../facebook-ads-campain/components/how-it-works/how-it-works.component';
import { WhyGoogleVccComponent } from './components/why-google-vcc/why-google-vcc.component';
import { RedGlowCtaComponent } from '../facebook-ads-campain/components/red-glow-cta/red-glow-cta.component';

@Component({
  selector: 'app-google-ads',
  imports: [
    HeroComponent,
    OverviewComponent,
    HowItWorksComponent,
    WhyGoogleVccComponent,
    RedGlowCtaComponent,
  ],
  templateUrl: './google-ads.component.html',
})
export class GoogleAdsComponent {}
