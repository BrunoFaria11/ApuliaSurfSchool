import { Component, OnInit } from '@angular/core';
import { LanguageStoreService } from '../../../core/stores/language-store.service';

declare function loadMap(markers: any): any;
declare function loadMapMobile(markers: any): any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor(public languageStoreService: LanguageStoreService) {
    languageStoreService.change("pt")
  }

  ngOnInit(): void {
    loadMap(this.languageStoreService.Texts.map.countries);
    loadMapMobile(this.languageStoreService.Texts.map.countries);
  }
}
