import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faBars, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { Listing } from '../entity/listing';
import { County } from '../entity/location/county';
import { Place } from '../entity/location/place';
import { CategoryService } from '../services/category.service';
import { ConditionService } from '../services/condition.service';
import { ListingService } from '../services/listing.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  
  disableSelect = new FormControl(false);

  listings: Listing[];
  counties: County[];
  categories: String[];
  conditions: String[];
  places: Place[];
  placeSelectDisabled: boolean = true;
  isExpanded: boolean = true;
  isShowing: boolean = false;
  showSubmenu: boolean = false;
  faBars = faBars;
  

  constructor(
    private listingService: ListingService,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private conditionService: ConditionService
    ) { }

  ngOnInit(): void {
    this.listingService.getListings().subscribe(
      listings => {
        this.listings = listings
      });
    this.locationService.getCounties().subscribe(
      counties => {
        this.counties = counties
      });
    this.categoryService.getCategories().subscribe(
      categories => this.categories = categories
    );
    this.conditionService.getConditions().subscribe(
      conditions => this.conditions = conditions
    );


  }

  onCountyChange(countyId){
    this.locationService.getPlacesByCountyId(countyId).subscribe(
      places => {
        this.places = places
        this.placeSelectDisabled = false;
    });
  }

  sidenavToggle(){
      this.isExpanded = !this.isExpanded;
  }

}
