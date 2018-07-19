import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsComponent } from './components/lists/lists.component';
import { ItemsComponent } from './components/items/items.component';
import { LoginComponent } from './components/login/login.component';
import { AddListFormComponent } from './components/add-list-form/add-list-form.component';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import { UpdateItemFormComponent } from './components/update-item-form/update-item-form.component';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';

const appRoutes: Routes = [
    { path: '', component: ListsComponent},
    { path: 'list/:id', component: ItemsComponent},
    { path: 'updateitem/:id', component: UpdateItemFormComponent},
    { path: 'login', component: LoginComponent},
    { path: 'addlist', component: AddListFormComponent},
    { path: 'additem/:list', component: AddItemFormComponent},
    { path: 'register', component: RegisterUserFormComponent},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);