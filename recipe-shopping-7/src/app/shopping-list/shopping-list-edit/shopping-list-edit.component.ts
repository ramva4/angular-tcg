import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: 'shopping-list-edit.component.html',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
    @ViewChild('form', { static: false }) form: NgForm;
    ingredientSub: Subscription;
    addMode: boolean = true;
    selIngIdx: number | undefined;

    // @ViewChild('name', {static: false}) name: NgModel;
    // @ViewChild('quantity', {static: false}) quantity: NgModel;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        this.ingredientSub = this.shoppingListService.ingredientSelected.subscribe((selectedIdx) => {
            const ingredient = this.shoppingListService.getIngredient(selectedIdx);
            this.selIngIdx = selectedIdx;
            /* The below will work since Ingredient has the same field names as our form controls */
            //this.form.setValue(ingredient);
            this.form.setValue({
                name: ingredient.name,
                quantity: ingredient.quantity
            });
            this.addMode = false;
        });
    }

    ngOnDestroy(): void {
        this.ingredientSub.unsubscribe();
    }

    onAddUpdateIngredient(form: NgForm) {
        //console.log(form);
        const quantity: number = form.value.quantity;
        const ingredient: string = form.value.name;
        this.shoppingListService.addIngredient({ 'ingredientName': ingredient, 'quantity': quantity }, this.addMode);
        this.clearForm();
    }

    onDelete() {
        if (!this.addMode) {
            /* !- non-null assertion */
            this.shoppingListService.delIngredient(this.selIngIdx!);
            this.clearForm();
        }
    }

    clearForm() {
        this.form.reset();
        this.addMode = true;
        this.selIngIdx = undefined;
        console.log(this.selIngIdx);
    }
}