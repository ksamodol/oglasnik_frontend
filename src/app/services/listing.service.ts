import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from '../app-constants';
import { Listing } from '../entity/listing';
import { ListingCommand } from '../entity/listingcommand';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private listingUrl = API_URL + "/listing";
  private vehicleListingUrl = this.listingUrl + "/vehicle"
  private propertyListingUrl = this.listingUrl + "/property"

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
  getListingsByUser(): Observable<Listing[]>{
    return this.http.get<Listing[]>(this.listingUrl + "/personal")
        .pipe(
          tap(_ => console.log('fetched listings by user')),
          catchError(this.handleError<Listing[]>("getListingsByUser"))
        );
  }
  getListingsWithParams(httpParams: HttpParams): Observable<Listing[]>{
    return this.http.get<Listing[]>(this.listingUrl, {params: httpParams})
        .pipe(
          tap(_ => console.log('fetched listings with param')),
          catchError(this.handleError<Listing[]>("getListingsWithParam"))
        );
  }
  getVehicleListingsWithParams(httpParams: HttpParams): Observable<Listing[]>{
    return this.http.get<Listing[]>(this.listingUrl + "/vehicle", {params: httpParams})
        .pipe(
          tap(_ => console.log('fetched vehicle listings with param')),
          catchError(this.handleError<Listing[]>("getVehicleListingsWithParam"))
        );
  }
  getPropertyListingsWithParams(httpParams: HttpParams): Observable<Listing[]>{
    return this.http.get<Listing[]>(this.listingUrl + "/property", {params: httpParams})
        .pipe(
          tap(_ => console.log('fetched property listings with param')),
          catchError(this.handleError<Listing[]>("getPropertyListingsWithParam"))
        );
  }

  postListing(formData: FormData, category: string){
    var url: string;
    if(category == "VEHICLE"){
      url = this.vehicleListingUrl;
    }else if(category == "PROPERTY"){
      url = this.propertyListingUrl;
    }else{
      url = this.listingUrl
    }

    return this.http.post<Listing>(this.listingUrl, formData)
    .pipe(
      tap(_ => console.log('posted listing')),
      catchError(this.handleError<Listing>("postListing"))
    );

  }

  deleteListing(listingId){
    return this.http.delete(this.listingUrl + "/" + listingId)
    .pipe(
      tap(_ => console.log('deleted listing')),
      catchError(this.handleError("deleteListing"))
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
