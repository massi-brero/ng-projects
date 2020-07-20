import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipesResolverService } from './recipes-resolver';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
    {
        path: 'recipes',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipesStartComponent },
            { path: 'new', component: RecipeEditComponent },
            {
                path: ':id',
                component: RecipesDetailsComponent,
                resolve: [RecipesResolverService],
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [RecipesResolverService],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipesRoutingModule {}
