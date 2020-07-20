import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from './recipes/recipe.service';
import { RecipesModule } from './recipes/recipes.module';
import { AlertComponent } from './shared/alert/alert.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ShoppingListComponent,
        ShoppingListEditComponent,
        DropdownDirective,
        AuthComponent,
        SpinnerComponent,
        AlertComponent,
        PlaceholderDirective,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        RecipesModule,
    ],
    providers: [
        ShoppingListService,
        RecipeService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
