import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  recipeIdx: number;

  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService, private router: Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeIdx = +params['idx']-1;
      this.recipe = this.recipeService.getRecipe(this.recipeIdx);      
    });
  }

  onAddToShoppingList() {
    //console.log('Add to shopping list - ' + this.recipe.ingredients);
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onDelete() {
    this.recipeService.delRecipe(this.recipeIdx);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
