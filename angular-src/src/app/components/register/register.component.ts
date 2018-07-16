import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private email: string;
  private password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    var user = {
      user: {
        email: this.email,
        password: this.password
      }
    }

    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      this.email = null;
      this.password = null;
    })
  }

}
