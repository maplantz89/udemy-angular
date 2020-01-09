import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsUpdated = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('bread', 2),
    new Ingredient('sugar', 5)
  ];

  /**
   * gets all ingredients (the slice is to return a copy not actual)
   */
  getIngredients(){
    return this.ingredients.slice();
  }

  /**
   * returns the ingreident with given index
   * @param index 
   */
  getIngredient(index: number){
    return this.ingredients[index];
  }

  /**
   * adds ingredient to list and updates anywhere that is using ingredients
   * @param ingredient 
   */
  addIngreident(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    // informs there is new data
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  /**
   * if you are added more than one ingredient
   * @param ingredients 
   */
  addIngreidents(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  /**
   * reassigns values to ingredient with given index and updates
   * @param index 
   * @param newIngredient 
   */
  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsUpdated.next(this.ingredients.slice());
  }

  /**
   * splices the one ingredient with the specific index
   * @param index 
   */
  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsUpdated.next(this.ingredients.slice());
  }
}