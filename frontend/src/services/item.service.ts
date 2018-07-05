import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';

@Injectable()
export class ItemService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }


    updateItem(itemId, item, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        let params = JSON.stringify(item);
        return this._http.put(this.url+'items/'+itemId, params,  {headers:headers});
    }

    addItem(item, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);
        let params = JSON.stringify(item);
        return this._http.post(this.url+'items', params,  {headers:headers});
    }

    deleteItem(itemId,token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        return this._http.delete(this.url+'items/'+itemId, {headers:headers});
    }
}