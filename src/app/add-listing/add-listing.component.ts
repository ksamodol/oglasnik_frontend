import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Listing } from '../entity/listing';
import { ListingCommand } from '../entity/listingcommand';
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
  selectedImages: FileList;
  imageNames: string[] = [];
  areImagesSelected: boolean = false;
  
  constructor(
    private listingService: ListingService,
    private locationService: LocationService,
    private categoryService: CategoryService,
    private conditionService: ConditionService,
    private fb: FormBuilder, 
    private registerService: RegisterService,
    private router: Router
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

    //TODO: reset fields on category change, fix validators required

    this.addListingForm = this.fb.group(
      {
        title: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]),
        description: new FormControl(null, [Validators.required, Validators.maxLength(3000)]),
        categorySelect: new FormControl(null, [Validators.required]),
        countySelect: new FormControl(null, [Validators.required]),
        placeSelect: new FormControl({value:null, disabled:true}, Validators.required),
        price: new FormControl(null,  [ Validators.required, Validators.min(0), Validators.max(100000000)]),
        conditionSelect: new FormControl(null, [Validators.required]),
        vehicleYear: new FormControl(null),
        vehicleMake: new FormControl(null),
        vehicleModel: new FormControl(null),
        vehicleMileage: new FormControl(null),
        vehicleHorsepower: new FormControl(null),
        propertyOutsideArea: new FormControl(null),
        propertyInsideArea: new FormControl(null),
        propertyFloors: new FormControl(null),
        propertyRooms: new FormControl(null),
        propertyYear: new FormControl(null),
        images: new FormControl(null)
      }
    )
  }

  submitForm(){
    const listingCommand = <ListingCommand>({
      title: this.title.value,
      description: this.description.value,
      category: (this.categorySelect.value as string).toUpperCase(),
      placeId: this.placeSelect.value,
      price: this.price.value,
      condition: (this.conditionSelect.value as string).toUpperCase(),
      year: this.vehicleYear.value,
      make: this.vehicleMake.value,
      model: this.vehicleModel.value,
      mileage: this.vehicleMileage.value,
      horsepower: this.vehicleHorsepower.value,
      insideArea: this.propertyInsideArea.value,
      outsideArea: this.propertyOutsideArea.value,
      yearBuilt: this.propertyYear.value,
      numberOfRooms: this.propertyRooms.value,
      floors: this.propertyFloors.value
    });
    
    const formData = new FormData();
    formData.append(
      "listing", 
      new Blob([JSON.stringify(listingCommand)], {
        type: "application/json"
    }));
    for(var i = 0; i < this.selectedImages.length; i++){
      console.log(this.selectedImages[i])
      formData.append("images", this.selectedImages[i])
    }
    
    console.log(formData)
    this.listingService.postListing(formData, listingCommand.category).subscribe();
    
        //this.router.navigate(["/listing", value.id])
  
  }

  onFileSelect(event) {
    console.log(event)
    this.imageNames = [];
    if (event.target.files.length > 0) {
      this.selectedImages = event.target.files;
      this.areImagesSelected = true;
    }
    for(var i = 0; i < this.selectedImages.length; i++){
      this.imageNames.push(this.selectedImages[i].name)
    }
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
  get countySelect(){
    return this.addListingForm.get("countySelect");
  }
  get placeSelect(){
    return this.addListingForm.get("placeSelect");
  }
  get price(){
    return this.addListingForm.get("price");
  }
  get conditionSelect(){
    return this.addListingForm.get("conditionSelect")
  }
  get vehicleYear(){
    return this.addListingForm.get("vehicleYear")
  }
  get vehicleMake(){
    return this.addListingForm.get("vehicleMake")
  }
  get vehicleModel(){
    return this.addListingForm.get("vehicleModel")
  }
  get vehicleMileage(){
    return this.addListingForm.get("vehicleMileage")
  }
  get vehicleHorsepower(){
    return this.addListingForm.get("vehicleHorsepower")
  }
  get propertyInsideArea(){
    return this.addListingForm.get("propertyInsideArea")
  }
  get propertyOutsideArea(){
    return this.addListingForm.get("propertyOutsideArea")
  }
  get propertyFloors(){
    return this.addListingForm.get("propertyFloors")
  }get propertyRooms(){
    return this.addListingForm.get("propertyRooms")
  }get propertyYear(){
    return this.addListingForm.get("propertyYear")
  }
  onCountyChange(countyId){
    this.locationService.getPlacesByCountyId(countyId).subscribe(
      places => {
        this.places = places
        this.placeSelect.enable();
    });
  }
  
}
