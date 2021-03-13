import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { StartComponent } from './start/start.component';
import {RouterModule} from "@angular/router";
import { AddGarmentPageComponent } from './garments/add-garment-page/add-garment-page.component';
import {HttpClientModule} from "@angular/common/http";
import { UndercategoryPipe } from './pipes/undercategory.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import { AttributeTagsComponent } from './garments/add-garment-page/attribute-tags/attribute-tags.component';
import { ChooseOutfitPageComponent } from './garments/choose-outfit-page/choose-outfit-page.component';
import { GarmentCardComponent } from './garments/choose-outfit-page/garment-card/garment-card.component';
import { AttributesAlphabeticalPipe } from './pipes/attributes-alphabetical.pipe';
import { DuplicateGarmentPipe } from './pipes/duplicate-garment.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StartComponent,
    AddGarmentPageComponent,
    UndercategoryPipe,
    AttributeTagsComponent,
    ChooseOutfitPageComponent,
    GarmentCardComponent,
    AttributesAlphabeticalPipe,
    DuplicateGarmentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UndercategoryPipe, AttributesAlphabeticalPipe, DuplicateGarmentPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
