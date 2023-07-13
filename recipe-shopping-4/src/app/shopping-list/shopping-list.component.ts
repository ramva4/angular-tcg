import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientsSubscription = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      });
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe()
  }

}
