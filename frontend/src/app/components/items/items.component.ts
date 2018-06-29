import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item';
import { ListService } from '../../../services/list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ListService]
})
export class ItemsComponent implements OnInit {
  public items: Array<Item>;
  public listName: String;

  constructor(
    private _listService: ListService,
    private _router: Router,
    private _route: ActivatedRoute,
    private location: Location
  ) {
    //this.items = [
    //  new Item('','Pollo', 1, 1, 'bandeja',''), 
    //  new Item('','Leche de almendras', 3, 1, 'bricks',''),
    //  new Item('','Canonigos', 1, 1, 'bolsa',''),
    //  new Item('','Cereales sin gluten', 1, 1, 'paquete',''),
    //  new Item('','Edulcorante', 1, 1, 'bote',''),          
    //  ];
 
   }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getItems(id);
      this.getList(id);
    })
    
  }

  getItems(id){
    this._listService.getListItems(id).subscribe(
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
    this._listService.getList(id).subscribe(
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
}
