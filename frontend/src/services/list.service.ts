import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';

@Injectable()
export class ListService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando';
    }

    getLists():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');       
        return this._http.get(this.url+'lists', {headers:headers});
    }

    getList(listId):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'lists/'+listId, {headers:headers});
    }

    getListItems(listId):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url+'listitems/'+listId, {headers:headers});
    }
}