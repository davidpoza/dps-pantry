import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item';
import { UserService } from '../../../services/user.service';
import { ItemService } from '../../../services/item.service';
import { AppService } from '../../../services/app.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css'],
  providers: [UserService,ItemService]
})
export class AddItemFormComponent implements OnInit {
  public item: Item;
  public token;
  public listId;
  public filesToUpload: Array<File>;
  public url: String;

  constructor(
    private _userService: UserService,
    private _appService: AppService,
    private _itemService: ItemService,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private location: Location
  ) { 
    this.url = Global.url;
    this._route.params.subscribe(params => {
    this.listId = params.list;
    this.item = new Item('',false,'',0,0,'','',this.listId);
    })
    
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this._appService.setShowMenu(false);
    this._appService.setTitle("");
  }


  onClick(form){
    this._itemService.addItem(this.item, this.token).subscribe(
      response => {
        if(this.filesToUpload) {
          this._itemService.makeFileRequest(this.url+"uploaditemimage/"+ response.item._id, [], this.filesToUpload, "image", this.token).then((result:any) => {
            this.snackBar.open("Item añadido con exito.", '', {
              duration: 500,
            });
              
          });
        }
        form.reset();                         
      },
      error => {
        this.snackBar.open(error.error.message, '', {
          duration: 500,
        });
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  goBack() {
    this.location.back();
  }

}
