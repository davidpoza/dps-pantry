import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsComponent } from './components/lists/lists.component';
import { ItemsComponent } from './components/items/items.component';

const appRoutes: Routes = [
    { path: '', component: ListsComponent},
    { path: 'list/:id', component: ItemsComponent}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);