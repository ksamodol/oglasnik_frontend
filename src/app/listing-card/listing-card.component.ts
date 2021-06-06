import { Component, Input, OnInit } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Listing } from '../entity/listing';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent implements OnInit {

  @Input() listing: Listing;
  faMapMarkerAlt = faMapMarkerAlt;
  constructor() { }

  ngOnInit(): void {
  }

}
