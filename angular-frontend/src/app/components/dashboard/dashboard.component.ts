import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NetworkCommandsService } from '../../services/network-commands.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private boards = [];
  private images = ["camera", "desk", "face", "flowers", "new-york", "tattoo"]
  private boardName: String;

  constructor(private authService: AuthService, private networkCommandsService: NetworkCommandsService) { }

  ngOnInit() {
    var profile = this.authService.getProfile().subscribe(data => {
      this.boards = data.user.boards;

      this.boards.map(board => {
        let className = this.images[Math.floor(Math.random() * this.images.length)];
        board.class = className;
      });
    })

  }


  addBoard() {
    if (this.boardName == undefined) {
      console.log("empty");
    }
    else {
      console.log(this.boardName);
      this.networkCommandsService.postBoard(this.boardName).subscribe(data => {

        this.boards = data.response.boards;

        this.toggleAddBoard();
      })
    }
  }

  toggleAddBoard() {
    $('.add-board-container').toggleClass('visible');
  }

  ngAfterOnInit() {
    console.log("working")
  }

}
