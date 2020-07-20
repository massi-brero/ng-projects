import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesRoutingModule } from './recipes-routing';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipesComponent } from './recipes.component';

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
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
    ],
    exports: [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailsComponent,
        RecipesItemComponent,
        RecipesStartComponent,
        RecipeEditComponent,
    ],
})
export class RecipesModule {}
