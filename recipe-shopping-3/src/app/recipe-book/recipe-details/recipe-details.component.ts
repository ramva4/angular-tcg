import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipe(+params['idx']-1);
    });
  }

  onAddToShoppingList() {
    //console.log('Add to shopping list - ' + this.recipe.ingredients);
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
