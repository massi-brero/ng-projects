import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { environment } from 'src/environments/environment';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    apiRecipesUrl = `${environment.apiUrl}/recipes.json`;
    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService
    ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.apiRecipesUrl, recipes).subscribe((res) => {
            console.log(res);
        });
    }

    fetchRecipes(): Observable<Recipe[]> {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http.get<Recipe[]>(this.apiRecipesUrl, {
                  params: new HttpParams().set('auth', user.token)
                });
            }),
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
