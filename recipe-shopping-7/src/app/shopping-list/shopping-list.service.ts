import { EventEmitter, Injectable, Output } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
    //@Output() ingredientChanged = new EventEmitter<Ingredient[]>();
    ingredientChanged = new Subject<Ingredient[]>();
    ingredientSelected = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Paneer', 1),
        new Ingredient('Onion', 2),
        new Ingredient('Capsicum', 1)
    ];

    /*  addMode: selects whether the quantity has to be added to the current quantity or replace it (edit mode) */
    addIngredient(newIngredient: { ingredientName: string, quantity: number }, addMode: boolean) {
        const newIngNameLower = newIngredient.ingredientName.toLocaleLowerCase();
        const alreadyAddedIngredient = this.ingredients.find((ingredient) => { return ingredient.name.toLocaleLowerCase() === newIngNameLower });
        if (alreadyAddedIngredient)
            alreadyAddedIngredient.quantity = +newIngredient.quantity +
                (addMode ? +alreadyAddedIngredient.quantity : 0);
        else this.ingredients.push(new Ingredient(newIngredient.ingredientName, newIngredient.quantity));
        this.notifyChange();
    }

    getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    }

    addIngredients(ingredients: Ingredient[]) {
        /*  This will unfortunately emit an event after every addIngredient()
            We call addIngredient(..) because it has the logic to consolidate items and quantities */
        ingredients.forEach((ingredient) => this.addIngredient({ ingredientName: ingredient.name, quantity: ingredient.quantity }, true),);

        /*  Alternatively use the spread operator '...; that converts an array into a list
            This is equivalent to .push(array[0], array[1]...)
            But this will not take care of the logic if grouping together ingredients by name and consolidating quantities */
        // this.ingredients.push(...ingredients);
    }

    getIngredient(idx: number): Ingredient {
        return this.ingredients[idx];
    }

    delIngredient(idx: number) {
        this.ingredients.splice(idx, 1);
        this.notifyChange();
    }

    private notifyChange() {
        this.ingredientChanged.next(this.getIngredients());
    }

}