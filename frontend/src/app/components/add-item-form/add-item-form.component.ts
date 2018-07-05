import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item';
import { UserService } from '../../../services/user.service';
import { ItemService } from '../../../services/item.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css'],
  providers: [UserService,ItemService]
})
export class AddItemFormComponent implements OnInit {
  public item: Item;
  public token;
  public listId;

  constructor(
    private _userService: UserService,
    private _itemService: ItemService,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private location: Location
  ) { 
    
    this._route.params.subscribe(params => {
    this.listId = params.list;
    this.item = new Item('','',0,0,'','',this.listId);
    })
    
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    
  }


  onClick(form){
    this._itemService.addItem(this.item, this.token).subscribe(
      response => {
        this.snackBar.open("Item añadido con exito.", '', {
          duration: 500,
        });
        form.reset();           
      },
      error => {
        this.snackBar.open(error.error.message, '', {
          duration: 500,
        });
      }
    );
  }

  goBack() {
    this.location.back();
  }

}
