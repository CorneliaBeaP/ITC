import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StartComponent} from "./start/start.component";
import {AddAttributesPageComponent} from "./attributes/add-attributes-page/add-attributes-page.component";
import {AddGarmentPageComponent} from "./garments/add-garment-page/add-garment-page.component";

const routes: Routes = [
  { path: 'home', component: StartComponent },
  { path: '', component: StartComponent },
  { path: 'attribute', component: AddAttributesPageComponent},
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
