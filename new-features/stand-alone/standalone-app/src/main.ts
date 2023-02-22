import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { ProductsComponent } from './app/products/products.component';
import { TodosComponent } from './app/todos/todos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'todo',
    component: TodosComponent,
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./app/products/products.component').then(
        (res) => res.ProductsComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
