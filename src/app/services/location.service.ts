import { Injectable } from '@angular/core';
import { fromEventPattern, Observable, of } from "rxjs";
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { tap, catchError} from 'rxjs/operators';
import { API_URL } from 'src/app/app-constants';
import { County } from '../entity/location/county';
import { Place } from '../entity/location/place';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private countyUrl = API_URL + "/location/county";
  private placeUrl = API_URL + "/location/place";

  constructor(private http:HttpClient) { }

  getCounties(): Observable<County[]>{
    return this.http.get<County[]>(this.countyUrl)
    .pipe(
      tap(_ => console.log('fetched counties')),
      catchError(this.handleError<County[]>("getCounties"))
    );
  }

  getPlacesByCountyId(countyId): Observable<Place[]>{
    const params = new HttpParams().set('countyId', countyId);
    return this.http.get<Place[]>(this.placeUrl, {params})
    .pipe(
      tap(_ => console.log('fetched places by county id')),
      catchError(this.handleError<County[]>("getPlacesByCountyId"))
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
