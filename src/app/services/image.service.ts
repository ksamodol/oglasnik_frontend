import { Injectable } from '@angular/core';
import { API_URL } from '../app-constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url = API_URL + "/images";

  constructor(private http:HttpClient) { }

  getImageList(id): Observable<string[]>{
    return this.http.get<string[]>(this.url + "/" + id)
    .pipe(
      tap(_ => console.log('fetched list of images')),
      catchError(this.handleError<string[]>("getImageList"))
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

