import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Paneer Tikka',
    'Grilled paneer, tomato and capsicum straight from the tandoor',
    'https://4.bp.blogspot.com/-e-4xLAFU04w/V5hiKfPUZ4I/AAAAAAAAFS4/5PSne87NBKEfp92z2Y3km2P9evrAtNfLACLcB/s1600/Instant_Paneer_Tikka_2.JPG'),
    new Recipe('Rava Pakoda',
    'Pakodas with rava, green chilli and ginger',
    'https://www.cookingwithsiddhi.com/wp-content/uploads/2017/12/suji-pakode-750x500.jpg')

  ];

  @Output() recipeChange = new EventEmitter<Recipe>();

  constructor() {
    console.log(this.recipes);
   }

  ngOnInit() { }

  selected(recipeSelected: Recipe) {
    // console.log('Selected recipe: ' + idx);
    this.recipeChange.emit(recipeSelected);
  }
}
