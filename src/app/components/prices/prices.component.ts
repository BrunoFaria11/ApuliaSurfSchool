import { Component } from '@angular/core';
import { LanguageStoreService } from '../../../core/stores/language-store.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss'
})
export class PricesComponent {
  constructor(
    public languageStoreService: LanguageStoreService,
  ) {}
}
