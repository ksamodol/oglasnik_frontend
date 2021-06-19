import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {



  constructor(private http: HttpClient) { }

  register(username: string, password:string, email:string, firstName: string, lastName: string){
    return this.http.post<any>(API_URL + "/register", {username, password, email, firstName, lastName});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
