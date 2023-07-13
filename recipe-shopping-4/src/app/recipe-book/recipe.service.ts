import { Injectable } from "@angular/core";
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
            'https://www.lathiskitchen.org/wp-content/uploads/2019/07/20190712_145541-01-1-1-1.jpeg',
            [{ name: 'Rava', quantity: 1 }, { name: 'Curd', quantity: 1 }, { name: 'Green Chilli', quantity: 2 }])
    ];

    public selectedRecipe: Recipe;

    /* Returns a copy of recipes using 'slice()' */
    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(idx: number) {
        /* Ideally we should clone this object using Object.assign() and return the clone */
        return this.recipes[idx];
    }
}