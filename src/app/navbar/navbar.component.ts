import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  constructor(public authenticationService: AuthenticationService) {}
  

  ngOnInit(): void {
  }

}
