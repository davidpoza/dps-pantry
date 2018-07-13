import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListsComponent } from './components/lists/lists.component';
import { ItemsComponent } from './components/items/items.component';
import { LoginComponent } from './components/login/login.component';
import { AddListFormComponent } from './components/add-list-form/add-list-form.component';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatInputModule }  from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    ItemsComponent,
    LoginComponent,
    AddListFormComponent,
    AddItemFormComponent,
    ConfirmationDialogComponent,
    RegisterUserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],

  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
