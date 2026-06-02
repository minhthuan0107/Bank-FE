import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-scenarios',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './payment-scenarios.component.html',
})
export class PaymentScenariosComponent {}
