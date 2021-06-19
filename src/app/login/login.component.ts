import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(128)])
      }
    );
  }

  get username(){
    return this.loginForm.get("username");
  }
  get password(){
    return this.loginForm.get("password");
  }

  login(){
    this.authService.login(this.username.value, this.password.value).subscribe(
      {
        next(x){
          console.log("Success login")
        },
        error(x){
          console.log("fail login")
        }
      }
    );
  }
}
