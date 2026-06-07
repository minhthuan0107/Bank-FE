import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-solutions-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './solutions-dropdown.component.html',
})
export class SolutionsDropdownComponent {
  isOpen = false;

  items = [
    {
      label: 'Facebook Ads VCC',
      link: '/solutions/facebook-ads-vcc',
    },
    {
      label: 'Google Ads VCC',
      link: '/solutions/google-ads-vcc',
    },
    {
      label: 'Tiktok Ads VCC',
      link: '/solutions/tiktok-ads-vcc',
    },
  ];
}
