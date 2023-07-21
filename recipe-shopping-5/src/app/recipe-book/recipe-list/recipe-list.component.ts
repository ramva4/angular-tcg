import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSub: Subscription;

  constructor(private recipeService: RecipeService) {
    // console.log(this.recipes);
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  ngOnInit() {
    this.recipeSub = this.recipeService.recipesChanged.subscribe(
      (recipes) => {
        this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
  }
}
