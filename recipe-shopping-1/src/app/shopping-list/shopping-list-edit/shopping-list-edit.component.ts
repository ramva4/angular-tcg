import { Component, ElementRef, EventEmitter, ViewChild, Output } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
    selector: 'app-shopping-list-edit',
    templateUrl: 'shopping-list-edit.component.html',
})
export class ShoppingListEditComponent {
    @ViewChild('amountInput', {static: false}) amount: ElementRef;
    @Output() addIngredient= new EventEmitter<{ingredientName: string, quantity:number}>();

    onAdd(inp:HTMLInputElement) {
        const quantity:number = this.amount.nativeElement.value;
        const ingredient:string = inp.value;
        if (inp.value && quantity) this.addIngredient.emit({'ingredientName':ingredient, 'quantity':quantity});
    }
}