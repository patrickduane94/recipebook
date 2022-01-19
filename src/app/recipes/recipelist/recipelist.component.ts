import {Component, OnDestroy, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipelist',
    templateUrl: './recipelist.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy{
    subscription: Subscription;
    recipes: Recipe[];

    constructor(private recipeService: RecipeService,
                private router: Router,
                private route: ActivatedRoute) {

    }
    ngOnInit(){
        this.subscription=this.recipeService.recipesUpdated
            .subscribe(
                (recipes: Recipe[]) =>{
                    this.recipes=recipes;
                }
            );
        this.recipes=this.recipeService.getRecipes();
    }
    newRecipe(){
        this.router.navigate(['new'], {relativeTo: this.route });
    }
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}