import { EventEmitter, Injectable, Output } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
    @Output() ingredientChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Paneer', 1),
        new Ingredient('Onion', 2),
        new Ingredient('Capsicum', 1)
    ];

    addIngredient(newIngredient: { ingredientName: string, quantity: number }) {
        const newIngNameLower = newIngredient.ingredientName.toLocaleLowerCase();
        const alreadyAddedIngredient = this.ingredients.find((ingredient) => { return ingredient.name.toLocaleLowerCase() === newIngNameLower });
        if (alreadyAddedIngredient)
            alreadyAddedIngredient.quantity = Number(alreadyAddedIngredient.quantity) + Number(newIngredient.quantity);
        else this.ingredients.push(new Ingredient(newIngredient.ingredientName, newIngredient.quantity));
        this.ingredientChanged.emit(this.getIngredients());
    }

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredients(ingredients: Ingredient[]) {
        /*  This will unfortunately emit an event after every addIngredient()
            We call addIngredient(..) because it has the logic to consolidate items and quantities */
        ingredients.forEach((ingredient) => this.addIngredient({ ingredientName: ingredient.name, quantity: ingredient.quantity }));

        /*  Alternatively use the spread operator '...; that converts an array into a list
            This is equivalent to .push(array[0], array[1]...)
            But this will not take care of the logic if grouping together ingredients by name and consolidating quantities */
        // this.ingredients.push(...ingredients);
    }
}