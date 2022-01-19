import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';
import {NgForm} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shoppingedit',
    templateUrl: './shoppingedit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
    @ViewChild('f') slForm: NgForm;
    subscription: Subscription;
    editMode=false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private slService: ShoppingListService){

    }
    ngOnInit(){
        this.subscription=this.slService.editStart
            .subscribe(
            (index: number) => {
                this.editMode=true;
                this.editedItemIndex=index;
                this.editedItem=this.slService.getIngredient(index);
                this.slForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                })
            }
        );

    }
    addOrSubmit(form: NgForm){
        const value = form.value;
        const newIngredient= new Ingredient(value.name, value.amount);
        if(this.editMode){
            this.slService.updateIngredient(this.editedItemIndex, newIngredient);
        }
        else{
            this.slService.addIngredient(newIngredient);
        }
        this.editMode=false;
        form.reset();
    }
    onClear(){
        this.slForm.reset();
        this.editMode=false;
    }
    onDelete(){
        this.slService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}