import { Component, OnInit, Input } from '@angular/core';
import { List } from '../../../models/list';
import { ListService } from '../../../services/list.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  providers: [ListService]
})
export class ListsComponent implements OnInit {

  public lists: Array<List>;
  public token;

  constructor(
    private _listService: ListService,
    private _userService: UserService,
  ){
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getLists();
  }

  getLists(){    
    this._listService.getLists(this.token).subscribe(
      response =>{
        this.lists = response.lists;
        
      },
      error => {
        console.log();
      }
    );
  }
}
