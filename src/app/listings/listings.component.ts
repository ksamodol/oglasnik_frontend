import { HttpParams } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faBars, faLongArrowAltRight, faSearch } from '@fortawesome/free-solid-svg-icons';
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
  isExpanded: boolean = false;
  showSubmenu: boolean = false;
  faBars = faBars;
  filterForm: FormGroup;
  httpParams: HttpParams = new HttpParams();

  

  constructor(
    private listingService: ListingService,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private conditionService: ConditionService,
    private fb: FormBuilder, 
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

    this.filterForm = this.fb.group(
      {
        search: new FormControl(null, Validators.minLength(3)),
        description: new FormControl(null),
        county: new FormControl(null),
        place: new FormControl({value:null, disabled:true}),
        category: new FormControl(null),
        condition: new FormControl(null),
        priceMin: new FormControl(null),
        priceMax: new FormControl(null),
        make: new FormControl(null),
        model: new FormControl(null),
        yearMin: new FormControl(null),
        yearMax: new FormControl(null),
        mileageMin: new FormControl(null),
        mileageMax: new FormControl(null),
        horsepowerMin: new FormControl(null),
        horsepowerMax: new FormControl(null),
        outsideAreaMin: new FormControl(null),
        outsideAreaMax: new FormControl(null),
        insideAreaMin: new FormControl(null),
        insideAreaMax: new FormControl(null),
        floorsMin: new FormControl(null),
        floorsMax: new FormControl(null),
        roomsMin: new FormControl(null),
        roomsMax: new FormControl(null),
        yearBuiltMin: new FormControl(null),
        yearBuiltMax: new FormControl(null)
      }
    )

  }

  onCountyChange(countyId){
    this.filterForm.get("place").setValue(null);
    this.locationService.getPlacesByCountyId(countyId).subscribe(
      places => {
        this.places = places
        this.place.enable();
    });
  }

  onSearch(){
    this.httpParams = new HttpParams;
    Object.keys(this.filterForm.controls).forEach(key => {
      let value = this.filterForm.get(key).value;
      if(value != null){
        if(key=="priceMin" || key=="priceMax"){ //iz kuna u lipe
          value *= 100;
        }
        if(key=="category" || key=="condition"){
          value = value.toUpperCase();
        }
        this.httpParams = this.httpParams.append(key, value)
      }

    });
    console.log(this.httpParams.toString());

    switch(this.filterForm.get("category").value){
      case "Vehicle":{
        this.listingService.getVehicleListingsWithParams(this.httpParams).subscribe(
          listings => {
            this.listings = listings
          });
          break;
      }
      case "Property":{
        this.listingService.getPropertyListingsWithParams(this.httpParams).subscribe(
          listings => {
            this.listings = listings
          });
          break;
      }
      default:{
        this.listingService.getListingsWithParams(this.httpParams).subscribe(
          listings => {
            this.listings = listings
          });
      }
    }
  }

  sidenavToggle(){
      this.isExpanded = !this.isExpanded;
  }
  get category(){
    return this.filterForm.get("category");
  }
  get place(){
    return this.filterForm.get("place");
  }

}
