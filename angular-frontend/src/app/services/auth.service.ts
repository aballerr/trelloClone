import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


const helper = new JwtHelperService();


@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  //private url: string = "/users";
  private url: string = "http://localhost:3000/users"
  private signUpURL = this.url + '/signup';
  private authenticateURL = this.url + '/authenticate';
  private profileURL = this.url + '/profile';


  constructor(private http: Http) {

  }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.signUpURL, user, { headers: headers }).pipe(map(res => res.json()))

  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.authenticateURL, user, { headers: headers }).pipe(map(res => res.json()))

  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.profileURL, { headers: headers }).pipe(map(res => res.json()))

  }

  loadToken() {
    this.authToken = localStorage.getItem('access_token');
  }

  isLoggedIn() {
    this.loadToken();
    const token = localStorage.getItem('access_token');
    return !helper.isTokenExpired(token);

  }

  storeUserData(access_token, user) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = access_token;
    this.user = user;

  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
