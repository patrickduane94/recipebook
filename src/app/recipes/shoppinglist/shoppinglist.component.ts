import {Component, OnInit} from '@angular/core';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from './shoppinglist.service';

@Component({
    selector: 'app-shoppinglist',
    templateUrl: './shoppinglist.component.html',
})
export class ShoppingListComponent implements OnInit{
    ingredients: Ingredient[];

    constructor(private slService: ShoppingListService){

    }
    
    editItem(index: number){
        this.slService.editStart.next(index);
    }
    ngOnInit(){
        this.ingredients=this.slService.getIngredients();
    }

}