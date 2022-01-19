import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './recipes/shoppinglist/shoppinglist.component';
import {DefaultComponent} from './recipes/default/default.component';
import { RecipeDetailComponent } from './recipes/recipedetail/recipedetail.component';
import { RecipeEditComponent } from './recipes/recipeedit/recipeedit.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeResolverService } from './recipes/recipe-resolve.service';

const appRoutes: Routes = [
    {path: '', redirectTo: 'recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent,
    canActivate: [AuthGuard], resolve: [RecipeResolverService], children: [
        {path: '', component: DefaultComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]}
    ]},
    {path: 'shoppinglist', component: ShoppingListComponent},
    {path: 'authentication', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}