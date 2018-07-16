import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private email: String;
  private password: String;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }



  registerUser() {

    var user =
      {
        user: {
          email: this.email,
          password: this.password
        }
      }

    this.authService.registerUser(user).subscribe(data => console.log(data))
  }


}
