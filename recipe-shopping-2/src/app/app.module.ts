import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-book/recipe-details/recipe-details.component';
import { RecipeItemComponent } from './recipe-book/recipe-list/recipe-item/recipe-item.component';
import { DropdownDirective } from './shared/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeBookComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
