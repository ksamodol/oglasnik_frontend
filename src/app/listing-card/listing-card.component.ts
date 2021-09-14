import { Component, Input, OnInit } from '@angular/core';
import { faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Listing } from '../entity/listing';
import { Router } from '@angular/router';
import { API_URL } from '../app-constants';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.css']
})
export class ListingCardComponent implements OnInit {

  @Input() listing: Listing;
  faMapMarkerAlt = faMapMarkerAlt;
  faUser = faUser;
  imgSrc: string;
  hasImage: boolean;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.imgSrc = API_URL + "/image" + "/" + this.listing.id + "/" + this.listing.images[0];
    if(this.listing.images.length == 0){
      this.hasImage = false;
    }else{
      this.hasImage = true;
    }
  }

  onListingClick(id: number){
    this.router.navigate(['listing', id]);
  }
}
