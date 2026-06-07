import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppLanguage, LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
})
export class LanguageSwitcherComponent {
  protected readonly languageService = inject(LanguageService);

  isLangOpen = false;

  changeLanguage(lang: AppLanguage) {
    this.languageService.use(lang);
    this.isLangOpen = false;
  }

  getCurrentLanguageLabel(): string {
    const currentLang = this.languageService.currentLang();

    const lang = this.languageService.languages.find((item) => item.code === currentLang);

    return lang ? `${lang.flag} ${lang.nativeLabel}` : currentLang;
  }
}
