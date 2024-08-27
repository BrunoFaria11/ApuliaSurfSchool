import { Component } from '@angular/core';
import { LanguageStoreService } from '../../../core/stores/language-store.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  constructor(
    public languageStoreService: LanguageStoreService,
  ) {}
}
