import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: String;
  private password: String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }



  clear(){
    this.authService.logout()
    this.authService.loadToken();
  }  

  loginUser() {
    var user = {
      user: {
        email: this.email,
        password: this.password
      }
    }

    this.authService.authenticateUser(user).subscribe(data => {
   

      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.authService.loadToken();
        this.router.navigate(['/'])
        

      }
      else {
        this.email = null;
        this.password = null;
      }
    
    })

  }

}
