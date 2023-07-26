import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipe-book/recipe.service";
import { Recipe } from "../recipe-book/recipe.model";
import { map } from "rxjs/operators";

@Injectable()
export class ServerAccessService {
    static readonly dbUrl: string = 'https://test-project-recipe-shopping-default-rtdb.asia-southeast1.firebasedatabase.app/recipe.json';
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    saveRecipes() {
        this.http.put(ServerAccessService.dbUrl, this.recipeService.getRecipes()).subscribe((response) => console.log(response));
    }

    fetchRecipes() {
        /* The below works even when ingredients[] is nonexistent for a recipe but...*/
        // this.http.get<Recipe[]>(ServerAccessService.dbUrl).subscribe((recipes) => {
        //     this.recipeService.setRecipes(recipes);
        // });

        /* Writing a better implementation with a feature to map the fields
        of recipe and add an ingredients[] in case we do not find one in the
        response for one or more recipes */
        this.http.get<Recipe[]>(ServerAccessService.dbUrl).pipe(map(recipes => {
            /* Calling array.map() */
            return recipes.map(recipe => {
                return { ...recipe, 
                    ingredients: (recipe.ingredients ? recipe.ingredients : [])};
            });            
        })).subscribe((recipes) => {
            console.log(recipes);
            this.recipeService.setRecipes(recipes);
        });
    }
}