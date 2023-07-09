import { NgModule } from "@angular/core";
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeDetailsComponent } from "./recipe-book/recipe-details/recipe-details.component";
import { NoRecipeSelectedComponent } from "./recipe-book/no-recipe-details/no-recipe-selected.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";

const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'recipes', component: RecipeBookComponent, children:
            [
                { path: '', component: NoRecipeSelectedComponent },
                /*  'new' path should come before ':idx' otherwise RecipeDetailsComponent
                will be invoked with 'new' as idx */
                { path: 'new', component: RecipeEditComponent },
                { path: ':idx', component: RecipeDetailsComponent },
                { path: ':idx/edit', component: RecipeEditComponent },

            ]
    },
    { path: 'shopping', component: ShoppingListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}