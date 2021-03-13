import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StartComponent} from "./start/start.component";
import {AddGarmentPageComponent} from "./garments/add-garment-page/add-garment-page.component";
import {ChooseOutfitPageComponent} from "./garments/choose-outfit-page/choose-outfit-page.component";

const routes: Routes = [
  { path: 'home', component: ChooseOutfitPageComponent },
  { path: '', component: StartComponent },
  { path: 'garment', component: AddGarmentPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
