import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error: boolean = false;
  success: boolean = false;
  errorMessage: string;
  

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(128), Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}$")]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phoneNumber: new FormControl(null, [Validators.required]),
        firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
        lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(32)])
      }
    )
  }

  register(){
    this.registerService.register(this.username.value, this.password.value, this.email.value, this.phoneNumber.value, this.firstName.value, this.lastName.value)
    .subscribe({
      next: (x) => {
        this.error = false;
        this.success = true;
        setTimeout(()=>{ this.router.navigate(['']); }, 2000)
      },
      error: (x) => {
        this.error = true;
        this.errorMessage = x.error;
      }
    }
    );
  }

  get username(){
    return this.registerForm.get("username");
  }
  get password(){
    return this.registerForm.get("password");
  }
  get email(){
    return this.registerForm.get("email");
  }
  get firstName(){
    return this.registerForm.get("firstName");
  }
  get lastName(){
    return this.registerForm.get("lastName");
  }
  get phoneNumber(){
    return this.registerForm.get("phoneNumber");
  }

}
