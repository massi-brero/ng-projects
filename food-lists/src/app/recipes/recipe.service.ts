import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";


@Injectable()
export class RecipeService {

  private recipes: Recipe[];

  constructor(private slService: ShoppingListService) {
    this.recipes = [
      new Recipe('' +
        'Schnitzel',
        'super-mega tasty mate...',
        'https://cdn.pixabay.com/photo/2016/11/19/02/22/schnipo-1837703_1280.jpg',
        [
          new Ingredient('Meat', 1),
          new Ingredient('French fries', 20),
        ]),
      new Recipe(
        'Burger',
        'this one is even better...',
        'https://www.publicdomainpictures.net/pictures/240000/velka/burger-on-a-wooden-backgound.jpg',
        [
          new Ingredient('Bun', 1),
          new Ingredient('Paddy', 2),
        ])
    ];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
