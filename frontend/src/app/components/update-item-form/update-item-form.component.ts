import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { ItemService } from '../../../services/item.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-update-item-form',
  templateUrl: './update-item-form.component.html',
  styleUrls: ['./update-item-form.component.css'],
  providers: [UserService,ItemService]
})
export class UpdateItemFormComponent implements OnInit {
  public item: Item;
  public token;
  public url: String;
  public filesToUpload: Array<File>;

  constructor(
    private _appService: AppService,
    private _userService: UserService,
    private _itemService: ItemService,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private location: Location,
  ) {
    this.url = Global.url;
    this.token = this._userService.getToken();  
    this.item = new Item('',false,'',0,0,'','','');
    this._route.params.subscribe(params => {
      this._itemService.getItem(params.id, this.token).subscribe(
        response => {
          this.item = response.item;
        },
        error => {
         
        }
      );
    })
  }


  onClick(form){
    this._itemService.updateItem(this.item._id, this.item, this.token).subscribe(
      response => {
        if(this.filesToUpload) {
          this._itemService.makeFileRequest(this.url+"uploaditemimage/"+ response.item._id, [], this.filesToUpload, "image", this.token).then((result:any) => {
            this.snackBar.open("Item añadido con exito.", '', {
              duration: 500,
            });
              
          });
        }
        this.snackBar.open("Item modificado con exito.", '', {
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

  ngOnInit() {
    this._appService.setShowMenu(false);
    this._appService.setTitle("");
  }


  goBack() {
    this.location.back();
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
