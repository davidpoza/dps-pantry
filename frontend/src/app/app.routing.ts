import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsComponent } from './components/lists/lists.component';
import { ItemsComponent } from './components/items/items.component';
import { LoginComponent } from './components/login/login.component';
import { AddListFormComponent } from './components/add-list-form/add-list-form.component';

const appRoutes: Routes = [
    { path: '', component: ListsComponent},
    { path: 'list/:id', component: ItemsComponent},
    { path: 'login', component: LoginComponent},
    { path: 'addlist', component: AddListFormComponent},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);