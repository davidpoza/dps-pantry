import { Component, OnInit } from '@angular/core';
import { List } from '../../../models/list';
import { ListService } from '../../../services/list.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  providers: [ListService]
})
export class ListsComponent implements OnInit {

  public lists: Array<List>;

  constructor(
    private _listService: ListService
  ){
    //this.lists = [new List('','nombre'), new List('','')];

  }

  ngOnInit() {
    this.getLists();
  }

  getLists(){
    this._listService.getLists().subscribe(
      response =>{
        this.lists = response.lists;
        
      },
      error => {
        console.log(error);
      }
    );
  }
}
