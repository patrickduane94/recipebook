import { ThrowStmt } from '@angular/compiler';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import {Recipe} from './recipe.model';
import { Ingredient } from './shoppinglist/ingredient.model';

export class RecipeService{
    recipeSelected=new EventEmitter<Recipe>();
    recipesUpdated=new Subject<Recipe[]>();

    private recipes: Recipe[] = [
    ];

    getRecipes(){
        return this.recipes.slice();
    }
    getRecipe(id: number){
        return this.recipes[id];
    }
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesUpdated.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index]=newRecipe;
        this.recipesUpdated.next(this.recipes.slice());
    }
    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesUpdated.next(this.recipes.slice());
    }
    setRecipes(recipes: Recipe[]){
        this.recipes=recipes;
        this.recipesUpdated.next(this.recipes.slice());
    }

}