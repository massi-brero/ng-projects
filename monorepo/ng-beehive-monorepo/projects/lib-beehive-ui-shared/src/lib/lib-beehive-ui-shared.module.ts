import { NgModule } from '@angular/core';
import {ComponentIdentifierModule} from "./features/component-identifier/component-identifier.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { MenuComponent } from './features/menu/menu.component';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    ComponentIdentifierModule,
    RouterModule
  ],
  exports: [
    ComponentIdentifierModule
  ]
})
export class LibBeehiveUISharedModule { }
