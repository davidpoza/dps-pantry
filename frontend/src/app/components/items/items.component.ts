import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item';
import { ListService } from '../../../services/list.service';
import { UserService } from '../../../services/user.service';
import { ItemService } from '../../../services/item.service';
import { AppService } from '../../../services/app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ListService,ItemService]
})
export class ItemsComponent implements OnInit {
  public items: Array<Item>;
  public listName: String;
  public token;
  public listId: String;

  constructor(
    private _listService: ListService,
    private _userService: UserService,
    private _itemService: ItemService,
    private _appService: AppService,
    private _router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getItems(id);
      this.getList(id);
      this.listId = id;
    })
    
  }

  getItems(id){
    this._listService.getListItems(id,this.token).subscribe(
      response =>{
        console.log(response);
        this.items = response.items;
        
      },
      error => {
        console.log(error);
      }
    );
  }

  getList(id){
    this._listService.getList(id,this.token).subscribe(
      response =>{
        console.log(response);
        this.listName = response.list.name;
        this._appService.setTitle(response.list.name);
        this._appService.setShowMenu(false);
      },
      error => {
        console.log(error);
      }
    );
  }

  goBack() {
    this.location.back();
  }

  addQuantity(id,index){
    let item = {
      quantity: this.items[index].quantity +1
    }
    this._itemService.updateItem(id,item,this.token).subscribe(
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
      this._itemService.updateItem(id,item,this.token).subscribe(
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
      data:{message: '¿Desea borrar este item de la lista?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // ha pulsado SI, borramos
        this._itemService.deleteItem(id,this.token).subscribe(
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

}
