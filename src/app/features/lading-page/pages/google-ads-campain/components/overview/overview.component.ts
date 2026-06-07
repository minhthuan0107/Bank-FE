import { Component, inject } from '@angular/core';
import { NavigateService } from '../../../../../../shared/services/navigate.service';

@Component({
  selector: 'app-google-ad-overview',
  imports: [],
  templateUrl: './overview.component.html',
})
export class OverviewComponent {
  protected navigateService = inject(NavigateService);
}
