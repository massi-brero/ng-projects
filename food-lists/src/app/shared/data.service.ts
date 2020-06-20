import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { environment } from 'src/environments/environment';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    apiRecipesUrl = `${environment.apiUrl}/recipes.json`;
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.apiRecipesUrl, recipes).subscribe((res) => {
            console.log(res);
        });
    }

    fetchRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.apiRecipesUrl).pipe(
            map((recipes) => {
                return recipes.map((recipe) => {
                    return { ...recipe, ingredients: recipe.ingredients || [] };
                });
            }),
            tap((recipes) => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}
