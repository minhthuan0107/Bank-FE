import { Component, inject } from '@angular/core';
import { NavigateService } from '../../../../../../shared/services/navigate.service';

@Component({
  selector: 'app-red-glow-cta',
  standalone: true,
  templateUrl: './red-glow-cta.component.html',
})
export class RedGlowCtaComponent {
  protected navigateService = inject(NavigateService);
}
