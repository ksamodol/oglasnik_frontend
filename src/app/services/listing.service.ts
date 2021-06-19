import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from '../app-constants';
import { Listing } from '../entity/listing';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private listingUrl = API_URL + "/listing";

  constructor(private http:HttpClient) { }

  getListings(): Observable<Listing[]>{
      return this.http.get<Listing[]>(this.listingUrl)
        .pipe(
          tap(_ => console.log('fetched listings')),
          catchError(this.handleError<Listing[]>("getListings"))
        );
  }

  getListingById(id): Observable<Listing>{
      return this.http.get<Listing>(this.listingUrl + "/" + id)
        .pipe(
          tap(_ => console.log('fetched listing')),
          catchError(this.handleError<Listing>("getListingById"))
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
