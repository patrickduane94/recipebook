import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './approuting.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeListComponent} from './recipes/recipelist/recipelist.component';
import {RecipeDetailComponent} from './recipes/recipedetail/recipedetail.component';
import {RecipeItemComponent} from './recipes/recipelist/recipeitem/recipeitem.component';
import {ShoppingListComponent} from './recipes/shoppinglist/shoppinglist.component';
import {ShoppingEditComponent} from './recipes/shoppinglist/shoppingedit/shoppingedit.component';
import {DefaultComponent} from './recipes/default/default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './recipes/dropdown.directive';
import { ShoppingListService } from './recipes/shoppinglist/shoppinglist.service';
import { RecipeEditComponent } from './recipes/recipeedit/recipeedit.component';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingComponent } from './auth/loading/loading.component';
import { AuthInterceptorService } from './auth/auth-int.service';
import { RecipeResolverService } from './recipes/recipe-resolve.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DefaultComponent,
    AuthComponent,
    LoadingComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ShoppingListService, RecipeService, RecipeResolverService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    
  }
}
