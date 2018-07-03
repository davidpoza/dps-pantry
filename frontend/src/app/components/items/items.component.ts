import { Component, OnInit, DoCheck } from '@angular/core';
import { Item } from '../../../models/item';
import { ListService } from '../../../services/list.service';
import { UserService } from '../../../services/user.service';
import { ItemService } from '../../../services/item.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ListService,ItemService]
})
export class ItemsComponent implements OnInit, DoCheck {
  public items: Array<Item>;
  public listName: String;
  public token;

  constructor(
    private _listService: ListService,
    private _userService: UserService,
    private _itemService: ItemService,
    private _router: Router,
    private _route: ActivatedRoute,
    private location: Location
  ) {
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getItems(id);
      this.getList(id);
    })
    
  }

  ngDoCheck(){
    
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
    this.items[index].quantity++;
    
    let item = {
      quantity: this.items[index].quantity
    }
    this._itemService.updateItem(id,item,this.token).subscribe(
      response =>{
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  removeQuantity(id,index){
    this.items[index].quantity--;
    
    let item = {
      quantity: this.items[index].quantity
    }
    this._itemService.updateItem(id,item,this.token).subscribe(
      response =>{
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
