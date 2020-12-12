import {NgModule} from "@angular/core";
import {AlertComponent} from "./alert/alert.component";
import {SpinnerComponent} from "./spinner/spinner.component";
import {Placeholder} from "@angular/compiler/src/i18n/i18n_ast";
import {PlaceholderDirective} from "./placeholder/placeholder.directive";
import {DropdownDirective} from "./dropdown.directive";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    SpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule {

}
