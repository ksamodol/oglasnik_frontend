import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Listing } from '../entity/listing';
import { County } from '../entity/location/county';
import { Place } from '../entity/location/place';
import { CategoryService } from '../services/category.service';
import { ConditionService } from '../services/condition.service';
import { ListingService } from '../services/listing.service';
import { LocationService } from '../services/location.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  listings: Listing[];
  counties: County[];
  places: Place[];
  placeSelectDisabled = true;
  categories: String[];
  conditions: String[];
  addListingForm: FormGroup;
  
  constructor(
    private listingService: ListingService,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private conditionService: ConditionService,
    private fb: FormBuilder, 
    private registerService: RegisterService
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

    

    this.addListingForm = this.fb.group(
      {
        title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        description: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
        categorySelect: new FormControl(null, [Validators.required]),
        countySelect: new FormControl(null, [Validators.required]),
        placeSelect: new FormControl({value:null, disabled:true}, Validators.required),
        price: new FormControl(null,  [ Validators.required, Validators.min(0), Validators.max(100000000)]),
        conditionSelect: new FormControl(null, [Validators.required]),
        vehicleYear: new FormControl(null, [Validators.required]),
        vehicleMake: new FormControl(null, [Validators.required]),
        vehicleModel: new FormControl(null, [Validators.required]),
        vehicleMileage: new FormControl(null, [Validators.required]),
        vehicleHorsepower: new FormControl(null, [Validators.required]),
        propertyOutsideArea: new FormControl(null, [Validators.required]),
        propertyInsideArea: new FormControl(null, [Validators.required]),
        propertyFloors: new FormControl(null, [Validators.required]),
        propertyRooms: new FormControl(null, [Validators.required]),
        propertyYear: new FormControl(null, [Validators.required])
      }
    )
  }

  submitForm(){

  }
  get title(){
    return this.addListingForm.get("title");
  }
  get description(){
    return this.addListingForm.get("description");
  }
  get categorySelect(){
    return this.addListingForm.get("categorySelect");
  }
  get placeSelect(){
    return this.addListingForm.get("placeSelect");
  }
  get price(){
    return this.addListingForm.get("price");
  }
  
  onCountyChange(listingId){
    this.locationService.getPlacesByCountyId(listingId).subscribe(
      places => {
        this.places = places
        this.placeSelect.enable();
    });
  }
  
}
