import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { OverviewComponent } from './components/overview/overview.component';

@Component({
  selector: 'app-google-ads',
  imports: [HeroComponent, OverviewComponent],
  templateUrl: './google-ads.component.html',
})
export class GoogleAdsComponent {}
