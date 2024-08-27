import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./containers/home/home.component";
import { BannerComponent } from "./components/banner/banner.component";
import { InfoComponent } from "./components/info/info.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { ServicesComponent } from "./components/services/services.component";
import { MapComponent } from "./components/map/map.component";
import { PricesComponent } from "./components/prices/prices.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from "./components/contact/contact.component";
import { GalleryComponent } from "./components/gallery/gallery.component";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";



@NgModule({
    declarations: [AppComponent, HeaderComponent, HomeComponent, BannerComponent, InfoComponent, AboutUsComponent, ServicesComponent, MapComponent, PricesComponent, ContactComponent, GalleryComponent],
    imports: [
        NgbModule,
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }