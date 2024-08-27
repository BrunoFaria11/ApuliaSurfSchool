import { Component } from '@angular/core';
import { LanguageStoreService } from '../../../core/stores/language-store.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  public isCollapsedAbout = true; 

  constructor(
    public languageStoreService: LanguageStoreService,
  ) {}

}
