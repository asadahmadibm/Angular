import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Component } from "ag-grid-community";
import { AccComponent } from "./commonComponent/acc/acc.component";
import { LogoutComponent } from "./commonComponent/Authenticate/logout/logout.component";
import { FishComponent } from "./commonComponent/fish/fish.component";
import { NotFoundComponent } from "./commonComponent/not-found/not-found.component";
import { Sample1Component } from "./commonComponent/sample1/sample1.component";

const routes: Routes = [
  { path: "fish", component: FishComponent },
  { path: "sample1", component: Sample1Component },
  { path: 'acc',component:AccComponent},
  { path:'',component:FishComponent},
  { path: "logout" , component:LogoutComponent},
  { path: '404', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
