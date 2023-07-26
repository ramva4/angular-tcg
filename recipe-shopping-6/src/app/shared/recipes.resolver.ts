import { ResolveFn } from '@angular/router';
import { Recipe } from '../recipe-book/recipe.model';
import { StorageAccessService } from './storage-access.service';
import { inject } from '@angular/core';
import { RecipeService } from '../recipe-book/recipe.service';

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const recipes = inject(RecipeService).getRecipes();
  if (recipes.length === 0) {
    return inject(StorageAccessService).fetchRecipes();
  } else {
    return recipes;
  }
};
