import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NetworkCommandsService } from '../../services/network-commands.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as autosize from 'autosize';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  board: Object;
  boardName: string;
  boardID: string;
  lists;
  visible = false;
  showAddNewListButton = false;
  newListName: string;
  placeholderText = "Add a list title..."

  constructor(public authService: AuthService,public networkCommandsService: NetworkCommandsService,public router: Router) {

  }

  ngOnInit() {

    this.getBoardInfo();
    var textarea = document.querySelector('textarea');


  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  resize(event) {
    var el = event.target || event.srcElement || event.currentTarget;
    autosize(el);
  }



  focus(event) {
    var target = event.target || event.srcElement || event.currentTarget;


    $(target).toggleClass('focus');


  }

  loadLists() {
    this.lists = this.board["lists"]
    this.lists.map((list) => {
      list.showAddButton = false;
      return list;
    })
    //This needs to be run only once the lists have been loaded
    this.resizeTextAreas();
  }

  resizeTextAreas() {
    $(function () {
      $("textarea").each(function () {
        autosize(this)
      });
    });
  }

  showButton(list, event) {
    list.showAddButton = !list.showAddButton
    var target = event.target || event.srcElement || event.currentTarget;
    var newPlaceHolderText = $(target).attr('placeholder') == '+ Add another card' ? 'Enter a title for this card...' : '+ Add another card';
    $(target).attr('placeholder', newPlaceHolderText);
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


  addToList() {
    if (this.newListName == undefined || this.newListName == "") { }
    else {
      var list = {
        listName: this.newListName,
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
            this.newListName = "";
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

  toggleShow() {
    var backgroundColor = $('.add').css('background-color') == 'rgba(0, 0, 0, 0.2)' ? '#F5F5F5' : 'rgba(0, 0, 0, 0.2)';
    var newPlaceHolderText = $('.add-textarea').attr('placeholder') == '+ Add another list' ? 'Enter list title...' : '+ Add another list';
    $('.add-textarea').attr('placeholder', newPlaceHolderText);
    $('.add').css('background-color', backgroundColor)
    $('.add-textarea').toggleClass('show');
    this.showAddNewListButton = !this.showAddNewListButton;
  }

}
