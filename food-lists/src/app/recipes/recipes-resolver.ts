import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataService } from "../shared/data.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: "root"
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataService: DataService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    if (this.recipeService.getRecipes().length === 0) {
      return this.dataService.fetchRecipes();
    }
  }
}
