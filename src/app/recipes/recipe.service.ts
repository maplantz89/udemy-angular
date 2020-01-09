import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient }  from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'french toast', 
      'yummy bfast', 
      'https://www.willcookforsmiles.com/wp-content/uploads/2019/02/French-Toast-Brioche.jpg', 
      [
        new Ingredient('Bread', 1),
        new Ingredient('Cinnamon', 2),
      ]),
    new Recipe(
      'french toast 2', 
      'yummy bfast', 
      'https://www.willcookforsmiles.com/wp-content/uploads/2019/02/French-Toast-Brioche.jpg', 
      [
        new Ingredient('Bread', 2),
        new Ingredient('Syrup', 3),
      ])
  ];

  constructor(private shoppingListService: ShoppingListService){}

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipeToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngreidents(ingredients);
  }

  getRecipeById(index: number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}