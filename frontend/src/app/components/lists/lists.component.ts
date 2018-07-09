import { Component, OnInit, Input } from '@angular/core';
import { List } from '../../../models/list';
import { ListService } from '../../../services/list.service';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  providers: [ListService]
})
export class ListsComponent implements OnInit {

  public lists: Array<List>;
  public token;

  constructor(
    private _listService: ListService,
    private _userService: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ){
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getLists();
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
}
