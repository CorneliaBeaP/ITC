import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AddGarmentPageComponent} from "./garments/add-garment-page/add-garment-page.component";
import {ChooseOutfitPageComponent} from "./garments/choose-outfit-page/choose-outfit-page.component";
import {ManageGarmentsPageComponent} from "./garments/manage-garments-page/manage-garments-page.component";
import {EditGarmentPageComponent} from "./garments/manage-garments-page/edit-garment-page/edit-garment-page.component";

const routes: Routes = [
  {path: 'home', component: ChooseOutfitPageComponent},
  {path: '', component: ChooseOutfitPageComponent},
  {path: 'add', component: AddGarmentPageComponent},
  {path: 'edit', component: ManageGarmentsPageComponent},
  {path: 'garment', component: EditGarmentPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
