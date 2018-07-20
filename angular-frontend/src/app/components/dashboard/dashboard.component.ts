import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  private imagesUsed = {};

  constructor(private router: Router,  private authService: AuthService,
    private networkCommandsService: NetworkCommandsService) { }

  ngOnInit() {
    var profile = this.authService.getProfile().subscribe(data => {
      this.boards = data.user.boards;
      this.addImagesBackgroundToBoards();

    })

  }


  addImagesBackgroundToBoards() {
    this.boards.map(board => {
      if (board.class == undefined) {
        this.imagesUsed = Object.keys(this.imagesUsed).length == this.images.length ? {} : this.imagesUsed
        let className
        do {
           className = this.images[Math.floor(Math.random() * this.images.length)];
        }
        while(className in this.imagesUsed)
        this.imagesUsed[className] = true;

        board.class = className;
      }
    });
  }


  addBoard() {
    if (this.boardName == undefined) {
      console.log("empty");
    }
    else if (this.boardName.replace(' ', '') == ''){
      console.log("empty");
    }
    else {

      this.networkCommandsService.postBoard(this.boardName).subscribe(data => {

        this.boards = data.response.boards;
        this.addImagesBackgroundToBoards();
        this.boardName = "";
        this.toggleAddBoard();
      })
    }
  }

  goToBoard(id){
    this.router.navigate(['/lists/'+id]);
  }

  toggleAddBoard() {
    $('.add-board-container').toggleClass('visible');
  }

  ngAfterOnInit() {
    console.log("working")
  }

}
