import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { API_URL } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  private conditionUrl = API_URL + "/condition";

  constructor(private http:HttpClient) { }

  getConditions(): Observable<String[]>{
    return this.http.get<String[]>(this.conditionUrl)
      .pipe(
        tap(_ => console.log('fetched conditions')),
        catchError(this.handleError<String[]>("getConditions"))
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
