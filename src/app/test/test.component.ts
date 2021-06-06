import { Component, OnInit } from '@angular/core';
import { Place } from '../entity/location/place';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  places: Place[];

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.locationService.getPlacesByCountyId("1").subscribe(
      places => {
        this.places = places
        places.forEach(x => console.log(x))
      
      });
  }
  

}
