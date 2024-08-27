import { Component, OnInit } from '@angular/core';
import { LanguageStoreService } from '../../../core/stores/language-store.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit {

  constructor(
    public languageStoreService: LanguageStoreService,
  ) {}

  ngOnInit(): void {}
}