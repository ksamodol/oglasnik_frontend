import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListingsComponent } from './listings/listings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRippleModule} from '@angular/material/core';
import { NavbarComponent } from './navbar/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { JwtModule } from "@auth0/angular-jwt";
import { LoginComponent } from './login/login.component';
import { HttpAuthInterceptorService } from './services/http-auth-interceptor.service';
import { RegisterComponent } from './register/register.component';
import { AddListingComponent } from './add-listing/add-listing.component';




@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ListingDetailsComponent,
    ListingsComponent,
    ListingCardComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AddListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatRippleModule,
    MDBBootstrapModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("jwt_token");
        },
        allowedDomains: ["http://localhost:8080"],
        disallowedRoutes: [],
      },
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
