import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Recipe} from './recipes/recipe.model';
import { RecipeService } from "./recipes/recipe.service";
import { AuthService } from "./auth/auth.service";
import { map, tap } from "rxjs/operators";
import { ShoppingListService } from "./recipes/shoppinglist/shoppinglist.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
constructor(private http: HttpClient, private rs: RecipeService, private as: AuthService, private sl: ShoppingListService) {}

storeRecipe(){
    const recipes=this.rs.getRecipes();
    this.http.put('https://recipes-b7439-default-rtdb.firebaseio.com/recipes.json', recipes)
    .subscribe(response => {
        console.log(response);
    });
}

fetchRecipe(){
        return this.http.get<Recipe[]>('https://recipes-b7439-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
    map(recipes =>{
        return recipes.map(recipe =>{
            return{
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
            };
        });
    }),
    tap(recipes =>{
        this.rs.setRecipes(recipes);
    })
    );
}
}