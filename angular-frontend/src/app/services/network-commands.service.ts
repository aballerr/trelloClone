import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { map }  from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NetworkCommandsService {

  private url: string = "http://localhost:3000/users"
  private boardURL: string = this.url + "/boards";
  private listURL: string = this.boardURL + "/lists";
  authToken: any;

  constructor(private http: Http, private authService: AuthService) { }


  loadToken(){
    this.authToken = localStorage.getItem('access_token');
  }


  postBoard(boardName){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.boardURL, {boardName: boardName}, {headers: headers}).pipe(map(res => res.json()))
  }

  postList(boardID, list){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.listURL, {boardID: boardID, listName: list.listName, items: list.items}, {headers: headers}).pipe(map(res => res.json()))

  }

  updateList(boardID, list){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    console.log(list);

    return this.http.put(this.listURL, {boardID: boardID, list: list}, {headers: headers}).pipe(map(res => res.json()))
  }
}
