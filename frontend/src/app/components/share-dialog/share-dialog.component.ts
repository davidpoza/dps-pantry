import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ListService } from '../../../services/list.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  message: string;
  listId: string;
}

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css'],
  providers: [ UserService, ListService ]
})
export class ShareDialogComponent implements OnInit {
  public token;
  public users;
  public userEmail;
  public message;
  public showMessage=false;
  
  constructor(
    private _userService: UserService,
    private _listService: ListService,
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getUsersSharedWith(this.data.listId);
  }

  getUsersSharedWith(listId){
    this._listService.getUserSharedWith(listId,this.token).subscribe(
      response =>{
        this.users = response.sharedLists;
        
      },
      error => {
        console.log();
      }
    );
  }

  share(){
    let usuario = this._userService.getUserByEmail(this.userEmail, this.token).subscribe(
    
      response =>{
        this._listService.addSharedList(this.data.listId, response.user._id, this.token).subscribe(
          response =>{
            this.message = "Lista compartida con usuario con éxito."
            this.getUsersSharedWith(this.data.listId);
          },
          error => {
            this.message = error.error.message;
          }
        );        
      },
      error => {
        this.message = error.error.message;
      }
    );
    this.showMessage = true;    
    setTimeout(function() {
      this.showMessage = false;
    }.bind(this), 3000);
  }

  removeShare(id){
    this._listService.removeSharedList(id,this.token).subscribe(
      response =>{
        this.message = "Permiso revocado al usuario con éxito."
        this.getUsersSharedWith(this.data.listId);
        
      },
      error => {
        this.message = "Error al revocar permiso al usuario."
      }
    );
    this.showMessage = true;    
    setTimeout(function() {
      this.showMessage = false;
    }.bind(this), 3000);
  }
}
