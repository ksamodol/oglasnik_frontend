import { Component, Input, OnInit } from '@angular/core';
import { faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Listing } from '../entity/listing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent implements OnInit {

  @Input() listing: Listing;
  faMapMarkerAlt = faMapMarkerAlt;
  faUser = faUser;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onListingClick(id: number){
    this.router.navigate(['listing', id]);
  }
}
