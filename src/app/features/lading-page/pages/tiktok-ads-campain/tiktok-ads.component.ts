import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { OverviewComponent } from './components/overview/overview.component';

@Component({
  selector: 'app-tiktok-ads',
  imports: [HeroComponent, OverviewComponent],
  templateUrl: './tiktok-ads.component.html',
})
export class TiktokAdsComponent {}
