import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {DataStorageService} from '../datastorage.service';
import { RecipeService } from './recipe.service';


@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dss: DataStorageService, private rs: RecipeService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes=this.rs.getRecipes();
        if(recipes.length===0){
        return this.dss.fetchRecipe();
        }
        else{
            return recipes;
        }
    }
}