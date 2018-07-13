import { Component,OnInit,DoCheck } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UserService ]
})
export class AppComponent implements OnInit, DoCheck {
  public identity;
  title = 'app';
  public showRegister;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.showRegister = false;
    if( this._router.url == '/register' )
      this.showRegister = true;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    console.log(this._router);
    
  }

  /* este evento salta cuando añadimos la key identity en el localStorage */
  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }
}

