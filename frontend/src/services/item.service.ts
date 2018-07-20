import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import { resolve, reject } from 'q';

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

    /* Creamos un objeto ajax contra la url de subida de ficheros
     y un objeto formulario donde añadimos todos los ficheros.
     
     Llamaremos a esta url del api justo despues de haber añadido un item
     con exito.*/
    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string, token){
        return new Promise(function(resolve, reject){
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }
                    else{
                        reject(xhr.response);
                    }
                }
            }

            xhr.open("POST", url, true);
            //añadimos la cabecera de autorizacion
            xhr.setRequestHeader('Authorization',token);
            xhr.send(formData);
        });
    }

    deleteItem(itemId,token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        return this._http.delete(this.url+'items/'+itemId, {headers:headers});
    }

    getItem(itemId,token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
        return this._http.get(this.url+'items/'+itemId, {headers:headers});
    }
}