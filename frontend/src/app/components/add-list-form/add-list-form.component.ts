import { Component, OnInit } from '@angular/core';
import { List } from '../../../models/list';
import { UserService } from '../../../services/user.service';
import { ListService } from '../../../services/list.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-list-form',
  templateUrl: './add-list-form.component.html',
  styleUrls: ['./add-list-form.component.css'],
  providers: [ ListService ]
})
export class AddListFormComponent implements OnInit {
  public list:List;
  public token;

  constructor(
    private _userService: UserService,
    private _listService: ListService,
    public snackBar: MatSnackBar,
    private location: Location
  ) {
    this.token = this._userService.getToken();
    this.list = new List('', '', 0);
   }

  ngOnInit() {
  }

  onClick(){
    this._listService.addList(this.list, this.token).subscribe(
      response => {
        this.snackBar.open("Lista creada con exito.", '', {
          duration: 500,
        });
        this.goBack();           
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
