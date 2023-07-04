import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.recipeService.selectionChange.subscribe((recipe) => this.recipe = recipe);
  }

  onAddToShoppingList() {
    //console.log('Add to shopping list - ' + this.recipe.ingredients);
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
