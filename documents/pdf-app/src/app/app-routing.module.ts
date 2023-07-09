import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PdfBaseComponent} from "./pdf-base/pdf-base.component";

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: PdfBaseComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
