import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Paneer', 1),
    new Ingredient('Onion', 2),
    new Ingredient('Capsicum', 1)
  ];

  onAddIngredient(newIngredient:{ingredientName: string, quantity:number}) {
    const newIngNameLower = newIngredient.ingredientName.toLocaleLowerCase();
    const alreadyAddedIngredient = this.ingredients.find((ingredient) => { return ingredient.name.toLocaleLowerCase() === newIngNameLower});
    if (alreadyAddedIngredient)
      alreadyAddedIngredient.quantity = Number(alreadyAddedIngredient.quantity) + Number(newIngredient.quantity);
      else this.ingredients.push(new Ingredient(newIngredient.ingredientName, newIngredient.quantity));
  }
}
