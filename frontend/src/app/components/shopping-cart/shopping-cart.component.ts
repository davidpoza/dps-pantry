import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item';
import { ListService } from '../../../services/list.service';
import { ShoppingListService } from '../../../services/shoppinglist.service';
import { UserService } from '../../../services/user.service';
import { ItemService } from '../../../services/item.service';
import { AppService } from '../../../services/app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [ListService,ItemService,ShoppingListService]
})
export class ShoppingCartComponent implements OnInit {
  public items: Array<Item>;
  public token;
  public identity;
  public url: String;

  constructor(
    private _listService: ListService,
    private _userService: UserService,
    private _shoppingListService: ShoppingListService,
    private _itemService: ItemService,
    private _appService: AppService,
    private _router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this._appService.setTitle("Lista de la compra");
    this.getItems();
  }

  getItems(){
    this._shoppingListService.getItems(this.identity._id, this.token).subscribe(
      response =>{
        this.items = response.shoppingList;
      },
      error => {
        console.log();
      }
    );
  }

  toggleChecked(checked,id,index){
    let item = {
      checked: checked
    }
    this._shoppingListService.updateItem(id,item,this.token).subscribe(
      response =>{
        this.items[index].checked = checked;
      },
      error => {
        console.log(error);
      }
    );
    
  }

  addQuantity(id,index){
    let item = {
      quantity: this.items[index].quantity +1
    }
    this._shoppingListService.updateItem(id,item,this.token).subscribe(
      response =>{
        console.log(response);
        this.items[index].quantity++;
      },
      error => {
        console.log(error);
      }
    );
  }

  removeQuantity(id,index){  
    let item = {
      quantity: this.items[index].quantity -1
    }
    if(item.quantity>=0){
      this._shoppingListService.updateItem(id,item,this.token).subscribe(
        response =>{
          console.log(response);
          this.items[index].quantity--;
        },
        error => {
          console.log(error);
        }
      );
    }

  }

  deleteItem(id,i){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{message: '¿Desea borrar este item de la lista de la compra?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // ha pulsado SI, borramos
        this._shoppingListService.deleteItem(id,this.token).subscribe(
          response =>{
            this.items.splice(i,1);
            this.snackBar.open("Item borrado con exito.", '', {
              duration: 500,
            });          
          },
          error => {
            this.snackBar.open(error.error.message, '', {
              duration: 500,
            });
          }
        );
      }

    });

  }

  showImage(ruta){
    let dialogRef = this.dialog.open(ImageDialogComponent, {
      data:{ruta: ruta}
    });
    
  }
}
