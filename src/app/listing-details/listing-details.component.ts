import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listing } from '../entity/listing';
import { ListingService } from '../services/listing.service';


@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {

  listing: Listing;

  constructor(private route: ActivatedRoute, private listingService: ListingService) { }


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    this.listingService.getListingById(id).subscribe(
      listing => this.listing = listing
    )
  }

}
