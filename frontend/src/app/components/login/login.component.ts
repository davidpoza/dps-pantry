import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service'; 
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:  [UserService ]
})
export class LoginComponent implements OnInit {
  public user:User;
  public identity;
  public token;
  public status: string;

  constructor(
    private _userService: UserService
  ) { 
    this.user = new User('','','','','',"true");

  }

  ngOnInit() {
  }

  onClick(){
    this._userService.login(this.user, "false" ).subscribe(
      response => {
          this.identity = response.user;
          console.log(response);
          if(!this.identity || !this.identity._id){
            this.status = 'error';
          }
          else{
            this.status = 'success';
            localStorage.setItem("identity", JSON.stringify(this.identity));
            this.getToken();
          }
          
      },
      error => {
        console.log();
      }
    );
  }

  getToken(){
    this._userService.login(this.user, "true").subscribe(
      response => {
          this.token = response.token;
          if(this.token.length <= 0){
            this.status = 'error';
          }
          else{
            this.status = 'success';
            localStorage.setItem("token", JSON.stringify(this.token));
          }
          
      },
      error => {
        console.log();
      }
    );
  }
}
