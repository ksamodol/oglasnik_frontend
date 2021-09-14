import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-constants';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {


  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

  login(username: string, password:string){
    return this.http.post<any>(API_URL + "/login", {username, password})
    .pipe(
      tap(response => {
        localStorage.setItem('jwt_token', response.token);
        localStorage.setItem(
          'username', 
          this.jwtHelperService.decodeToken(response.token).sub
          );
        localStorage.setItem(
          'exp', 
          this.jwtHelperService.decodeToken(response.token).exp
        );
      }),
    );
    
  }

  logout(){
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username');
    localStorage.removeItem('exp');
  }

  getUsername(){
    return localStorage.getItem('username');
  }

  getToken(){
    return localStorage.getItem('jwt_token');
  }

  isUserLoggedIn(){
    if(localStorage.getItem('jwt_token') && localStorage.getItem('username') && parseInt(localStorage.getItem('exp')) > Math.floor(Date.now() / 1000)){
      return true;
    }
    return false;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
