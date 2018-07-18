import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NetworkCommandsService } from '../../services/network-commands.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  private board: Object;
  private boardName: string;
  private boardID: string;
  private lists;


  private placeholderText = "Add a list title..."

  constructor(private authService: AuthService, private networkCommandsService: NetworkCommandsService, private router: Router) {

  }

  ngOnInit() {
    this.getBoardInfo();
  }

  trackByFn(index, item) {
    return index; // or item.id
  }




  focus() {
    var target = event.target || event.srcElement || event.currentTarget;
    $(target).toggleClass('focus');

    var newPlaceHolderText = $(target).attr('placeholder') == '+ Add item to list..' ? 'Enter new item...' : '+ Add item to list..';
    $(target).attr('placeholder', newPlaceHolderText);
  }

  loadLists() {
    this.lists = this.board["lists"]
  }

  updateList(list) {

    if (list.nextItem == undefined) { }
    else if (list.nextItem.replace(' ', '') == "") { }
    else {
      list.items.push(list.nextItem);
      list.nextItem = "";
    }
    this.networkCommandsService.updateList(this.boardID, list).subscribe(data => {
      var boards = data.response.boards;
      this.boardID = this.router.url.replace(/[^0-9]/g, '');

      boards.forEach((board) => {
        if (this.boardID == board.boardID) {
          this.board = board;
          this.boardName = board.boardName;
          this.loadLists();
        }
      })
    })
  }


  addToList(newListName) {
    if (newListName == undefined || newListName == "") {

    }
    else {
      var list = {
        listName: newListName,
        items: []
      }

      this.networkCommandsService.postList(this.boardID, list).subscribe(data => {
        var boards = data.response.boards;
        this.boardID = this.router.url.replace(/[^0-9]/g, '');

        boards.forEach((board) => {
          if (this.boardID == board.boardID) {
            this.board = board;
            this.boardName = board.boardName;
            this.loadLists();
          }
        })
      })
    }
  }

  getBoardInfo() {
    this.authService.getProfile().subscribe(data => {
      var boards = data.user.boards;
      this.boardID = this.router.url.replace(/[^0-9]/g, '');

      boards.forEach((board) => {
        if (this.boardID == board.boardID) {
          this.board = board;
          this.boardName = board.boardName;
          this.loadLists();
        }
      })
    })
  }

}
