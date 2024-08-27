import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageStoreService } from '../core/stores/language-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'apulia_surf_school';

}
