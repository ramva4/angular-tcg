import { Component, ElementRef, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: 'shopping-list-edit.component.html',
})
export class ShoppingListEditComponent {
    @ViewChild('nameInput', {static: false}) ingName: ElementRef;
    @ViewChild('amountInput', {static: false}) amount: ElementRef;
    
    constructor(private shoppingListService: ShoppingListService) {}

    onAdd() {
        const quantity:number = this.amount.nativeElement.value;
        const ingredient:string = this.ingName.nativeElement.value;
        if (ingredient && quantity) this.shoppingListService.addIngredient({'ingredientName':ingredient, 'quantity':quantity});
    }
}