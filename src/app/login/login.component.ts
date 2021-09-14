import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  badLogin: boolean = false;
  goodLogin: boolean = false;


  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) { }

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
        next: () => {
          this.goodLogin = true;
          this.badLogin = false;
          setTimeout(()=>{ this.router.navigate(['']); }, 2000)
          
        },
        error: (x) => {
          this.badLogin = true;
          this.goodLogin = false;
        }
      }
    );
  }
}
