import { EventEmitter, Injectable, Output } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('Paneer Tikka',
            'Grilled paneer, tomato and capsicum straight from the tandoor',
            'https://4.bp.blogspot.com/-e-4xLAFU04w/V5hiKfPUZ4I/AAAAAAAAFS4/5PSne87NBKEfp92z2Y3km2P9evrAtNfLACLcB/s1600/Instant_Paneer_Tikka_2.JPG',
            [{ name: 'Paneer', quantity: 5 }, { name: 'Onion', quantity: 1 }, { name: 'Capsicum', quantity: 1 }]),
        new Recipe('Rava Pakoda',
            'Pakodas with rava, green chilli and ginger',
            'https://www.cookingwithsiddhi.com/wp-content/uploads/2017/12/suji-pakode-750x500.jpg',
            [{ name: 'Rava', quantity: 1 }, { name: 'Curd', quantity: 1 }, { name: 'Green Chilli', quantity: 2 }])
    ];

    public selectedRecipe: Recipe;

    @Output() public selectionChange = new EventEmitter<Recipe>();

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }
}