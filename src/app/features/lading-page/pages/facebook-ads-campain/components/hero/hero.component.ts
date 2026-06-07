import { Component, inject } from '@angular/core';
import { NavigateService } from '../../../../../../shared/services/navigate.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-facebook-ad-hero',
  imports: [TranslatePipe],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  protected navigateService = inject(NavigateService);
}
