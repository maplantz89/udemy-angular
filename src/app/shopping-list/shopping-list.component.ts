import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsUpdated.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }

  /**
   * this is storing the index of the item clicked in the service as a subject so that the index can be accessed
   * by the shopping list edit component to actually do the editing of that specific item
   */
  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }
}
