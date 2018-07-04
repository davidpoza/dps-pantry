import { Component, OnInit } from '@angular/core';
import { List } from '../../../models/list';

@Component({
  selector: 'app-add-list-form',
  templateUrl: './add-list-form.component.html',
  styleUrls: ['./add-list-form.component.css']
})
export class AddListFormComponent implements OnInit {
  public list:List;

  constructor() {
    this.list = new List('', '', 0);
   }

  ngOnInit() {
  }

}
