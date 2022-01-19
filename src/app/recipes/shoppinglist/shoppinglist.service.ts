import { Subject } from 'rxjs';
import {Ingredient} from './ingredient.model';

export class ShoppingListService{
    editStart=new Subject<number>();
    private ingredients: Ingredient[] = [];

    getIngredient(index: number){
        return this.ingredients[index];
    }
    getIngredients(){
        return this.ingredients;
    }
    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
    }
    addToList(ingredients: Ingredient[]){
        for(let ingredient of ingredients){
            this.addIngredient(ingredient);
        }
    }
    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index]=newIngredient;
    }
    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
    }
}