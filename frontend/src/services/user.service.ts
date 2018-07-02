import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
    public url:string;
    public identity;
    public token;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando';
    }

    login(user: User, gettoken): Observable<any>{
        if(gettoken){
            user.gettoken = gettoken;
        }
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let params = JSON.stringify(user);
        return this._http.post(this.url+'login/', params, {headers:headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity = identity;
        }
        else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = JSON.parse(localStorage.getItem('token'));
        if(token != "undefined"){
            this.token = token;
        }
        else{
            this.token = null;
        }
        return this.token;
    }

}