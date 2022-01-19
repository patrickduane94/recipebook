import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../shoppinglist/shoppinglist.service';

@Component({
    selector: 'app-recipedetail',
    templateUrl: './recipedetail.component.html'
})
export class RecipeDetailComponent implements OnInit{
    id: number;
    recipe: Recipe;

    constructor(private shoppingList: ShoppingListService,
                private recipeService: RecipeService,
                private route: ActivatedRoute,
                private router: Router)
                {

    }
    
    ngOnInit(){
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id=+params['id'];
                    this.recipe=this.recipeService.getRecipe(this.id);
                }
            );
    }
    addToShoppingList(){
        this.shoppingList.addToList(this.recipe.ingredients);
    }
    editRecipe(){
        this.router.navigate(['edit'], {relativeTo: this.route});
    }
    onDeleteRecipe(){
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['/recipes']);
    }
}