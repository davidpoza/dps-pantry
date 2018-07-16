import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css'],
  providers: [ UserService ]
})
export class ShareDialogComponent implements OnInit {
  public token;
  public users;

  constructor(
    private _userService: UserService,
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getUsers();
  }


  getUsers(){
    this._userService.getUsers(this.token).subscribe(
      response =>{
        this.users = response.users;
        
      },
      error => {
        console.log();
      }
    );
  }
}
