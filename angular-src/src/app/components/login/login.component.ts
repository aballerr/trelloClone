import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private password: string;
  private email: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }



  onLoginSubmit(){
    var request = {
      email: this.email,
      password: this.password
    }
    console.log(request)

    this.authService.authenticateUser(request).subscribe(data => {
      console.log(data)

      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/'])
      }
      else {
        this.email = null;
        this.password = null;
      }
    })
  }

}
