import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:  [UserService ]
})
export class LoginComponent implements OnInit {
  public user:User;
  public propiedad;

  constructor(
    private _userService: UserService
  ) { 
    this.user = new User('','','','','');

  }

  ngOnInit() {
  }

  onClick(){
    alert(this.user.name);
  }

}
