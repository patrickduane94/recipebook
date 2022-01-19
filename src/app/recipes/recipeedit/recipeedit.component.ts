import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import {Router} from '@angular/router';
import { DataStorageService } from "src/app/datastorage.service";

@Component({
    selector: 'recipe-edit',
    templateUrl: './recipeedit.component.html',
    styleUrls: ['./recipeedit.component.css']
})

export class RecipeEditComponent implements OnInit{
    id: number;
    editMode=false;
    recipeForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private recipeService: RecipeService,
                private router: Router,
                private dss: DataStorageService){}

    ngOnInit(){
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id= +params['id'];
                    this.editMode=params['id']!=null;
                    this.initForm();
                }
            );
    }
    private initForm(){
        let recipeName='';
        let recipeImagePath='';
        let recipeDescription='';
        let recipeIngredients= new FormArray([]);
        if(this.editMode){
            const recipe=this.recipeService.getRecipe(this.id);
            recipeName=recipe.name;
            recipeImagePath=recipe.imagePath;
            recipeDescription=recipe.description;
            if(recipe['ingredients']){
                for(let ingredient of recipe.ingredients){
                    recipeIngredients.push(
                        new FormGroup({
                       'name': new FormControl(ingredient.name, Validators.required),
                       'amount': new FormControl(ingredient.amount, [
                           Validators.required,
                           Validators.pattern(/^[1-9]+[0-9]*$/)
                       ]) 
                        })
                    );
                }
            }
        }
        this.recipeForm=new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients
        });
    }
    onSubmit(){
        const newRecipe=new Recipe(
        this.recipeForm.value['name'],
        this.recipeForm.value['description'],
        this.recipeForm.value['imagePath'],
        this.recipeForm.value['ingredients']);

        if(this.editMode){
            this.recipeService.updateRecipe(this.id, newRecipe);
        }
        else{
            this.recipeService.addRecipe(newRecipe);
        }
        this.dss.storeRecipe();
        this.onCancel();
    }
    get controls(){
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }
    addIngredient(){
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
        );
    }
    onCancel(){
        this.router.navigate(['../'], {relativeTo: this.route});
    }
    deleteIngredient(index: number){
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

}