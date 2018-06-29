import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  public items: Array<Item>;

  constructor() {
    this.items = [
      new Item('','Pollo', 1, 1, 'bandeja',''), 
      new Item('','Leche de almendras', 3, 1, 'bricks',''),
      new Item('','Canonigos', 1, 1, 'bolsa',''),
      new Item('','Cereales sin gluten', 1, 1, 'paquete',''),
      new Item('','Edulcorante', 1, 1, 'bote',''),          
      ];
   }

  ngOnInit() {
  }

  getItems(){
    
  }
}
