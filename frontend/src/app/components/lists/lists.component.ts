import { Component, OnInit, Input } from '@angular/core';
import { List } from '../../../models/list';
import { ListService } from '../../../services/list.service';
import { UserService } from '../../../services/user.service';
import { AppService } from '../../../services/app.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  providers: [ListService]
})
export class ListsComponent implements OnInit {

  public lists: Array<List>;
  public sharedlists: Array<List>;
  public token;
  public identity;

  constructor(
    private _listService: ListService,
    private _userService: UserService,
    private _appService: AppService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ){
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.getLists();
    this.getSharedLists();
  }

  ngOnInit() {
    this._appService.setTitle("Listas");
  }

  getLists(){    
    this._listService.getLists(this.token).subscribe(
      response =>{
        this.lists = response.lists;
        
      },
      error => {
        console.log();
      }
    );
  }

  getSharedLists(){
    this._listService.getSharedLists(this.identity._id, this.token).subscribe(
      response =>{
        this.sharedlists = response.lists;
        
      },
      error => {
        console.log();
      }
    );
  }

  deleteList(id,i){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{message: '¿Desea borrar la lista?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // ha pulsado SI, borramos
        this._listService.deleteList(id,this.token).subscribe(
          response =>{
            this.lists.splice(i,1);
            this.snackBar.open("Lista borrada con exito.", '', {
              duration: 500,
            });          
          },
          error => {
            this.snackBar.open(error.error.message, '', {
              duration: 500,
            });
          }
        );
      }

    });
    
    
  }

  shareList(id,i){
    let dialogRef = this.dialog.open(ShareDialogComponent, {
      data:{listId: id,
      message: 'Selecciona usuario con quien compartir'}
    });
       
    
  }
}
