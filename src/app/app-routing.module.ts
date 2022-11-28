import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Component } from "ag-grid-community";
import { AccComponent } from "./commonComponent/acc/acc.component";
import { FishComponent } from "./commonComponent/fish/fish.component";
import { NotFoundComponent } from "./commonComponent/not-found/not-found.component";
import { Sample1Component } from "./commonComponent/sample1/sample1.component";
import { Sample2Component } from "./modules/sample2/sample2.component";

const routes: Routes = [
  { path: "fish", component: FishComponent },
  { path: "sample1", component: Sample1Component },
  { path: "sample2", component: Sample2Component },
  { path: 'acc',component:AccComponent},
  { path:'',component:FishComponent},
  { path: '404', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
