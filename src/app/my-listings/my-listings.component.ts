import { Component, OnInit } from '@angular/core';
import { Listing } from '../entity/listing';
import { ListingService } from '../services/listing.service';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit {

  listings: Listing[];

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.listingService.getListingsByUser().subscribe(
      listings => {
        this.listings = listings
      });
  }

  deleteListing(listingId, listingIndex){
    this.listingService.deleteListing(listingId).subscribe(
      () => {
        this.listings.splice(listingIndex, 1);
      }
    );
  }

}
