import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from '../app-constants';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = API_URL + "/category";

  constructor(private http:HttpClient) { }

  getCategories(): Observable<String[]>{
    return this.http.get<String[]>(this.categoryUrl)
      .pipe(
        tap(_ => console.log('fetched categories')),
        catchError(this.handleError<String[]>("getCategories"))
      );
    }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
