import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item';
import { ListService } from '../../../services/list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ListService]
})
export class ItemsComponent implements OnInit {
  public items: Array<Item>;

  constructor(
    private _listService: ListService,
    private _router: Router,
    private _route: ActivatedRoute
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
}
