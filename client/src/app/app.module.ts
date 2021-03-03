import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './start/start.component';
import {RouterModule} from "@angular/router";
import { ThemeComponent } from './attributes/theme/theme.component';
import { AddAttributesPageComponent } from './attributes/add-attributes-page/add-attributes-page.component';
import { AddGarmentPageComponent } from './garments/add-garment-page/add-garment-page.component';
import {HttpClientModule} from "@angular/common/http";
import { UndercategoryPipe } from './pipes/undercategory.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StartComponent,
    ThemeComponent,
    AddAttributesPageComponent,
    AddGarmentPageComponent,
    UndercategoryPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [UndercategoryPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
