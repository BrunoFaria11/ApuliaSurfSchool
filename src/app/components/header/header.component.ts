import { Component, OnInit } from '@angular/core';
import { LanguageStoreService } from '../../../core/stores/language-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  value = 'pt';
  selectImage = '../../../assets/images/flags/pt.png';
  activeMenu = 'pageTop';
  constructor(
    public languageStoreService: LanguageStoreService
  ) {
  }

  changeLanguage(language: string) {
    this.value = language.charAt(0) + language.slice(1);
    if (this.value == 'eng') {
      this.selectImage = '../../../assets/images/flags/pt.png';
    } else {
      this.selectImage = '../../../assets/images/flags/gb-eng.png';
    }
    this.languageStoreService.change(this.value);
  }

  changeActiveMenu(menu: string) {
    this.activeMenu = menu;
  }

  ngOnInit(): void {
    const websiteLang = localStorage.getItem('websiteLang');

    if (websiteLang == undefined) {
      this.selectImage = '../../../assets/images/flags/gb-eng.png';
    } else {
      if (websiteLang == 'eng') {
        this.selectImage = '../../../assets/images/flags/pt.png';
      } else {
        this.selectImage = '../../../assets/images/flags/gb-eng.png';
      }
    }
  }
}
