import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RedGlowCtaComponent } from '../facebook-ads-campain/components/red-glow-cta/red-glow-cta.component';
import { HowItWorksComponent } from '../facebook-ads-campain/components/how-it-works/how-it-works.component';
import { WhyTiktokVccComponent } from './components/why-tiktok-vcc/why-tiktok-vcc.component';

@Component({
  selector: 'app-tiktok-ads',
  imports: [
    HeroComponent,
    OverviewComponent,
    RedGlowCtaComponent,
    WhyTiktokVccComponent,
    HowItWorksComponent,
  ],
  templateUrl: './tiktok-ads.component.html',
})
export class TiktokAdsComponent {}
