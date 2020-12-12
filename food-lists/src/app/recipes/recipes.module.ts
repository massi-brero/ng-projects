import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesDetailsComponent} from './recipes-details/recipes-details.component';
import {RecipesItemComponent} from './recipes-list/recipes-item/recipes-item.component';
import {RecipesListComponent} from './recipes-list/recipes-list.component';
import {RecipesRoutingModule} from './recipes-routing';
import {RecipesStartComponent} from './recipes-start/recipes-start.component';
import {RecipesComponent} from './recipes.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailsComponent,
        RecipesItemComponent,
        RecipesStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
    ]
})
export class RecipesModule {}
