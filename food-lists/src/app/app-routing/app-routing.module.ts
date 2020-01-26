import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "../recipes/recipes.component";
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {RecipesStartComponent} from "../recipes/recipes-start/recipes-start.component";
import {RecipesDetailsComponent} from "../recipes/recipes-details/recipes-details.component";
import {RecipeEditComponent} from "../recipes/recipe-edit/recipe-edit.component";

const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipesStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipesDetailsComponent},
      {path: ':id/edit', component: RecipeEditComponent},
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
