import { Component, OnInit, ViewChild } from '@angular/core';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { Listing } from '../entity/listing';
import { ListingService } from '../services/listing.service';
import { API_URL } from '../app-constants';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css']
})
export class ListingDetailsComponent implements OnInit {
  
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  private imageUrl = API_URL + "/image";
  listing: Listing;
  private id: string;
  private imageNames: string[];
  hasImage: boolean;

  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
    showCloseControl: false,
    closeOnEsc: false,
    reactToMouseWheel: false,
    inline: true
  };

  images: GALLERY_IMAGE[] = [];


  constructor(
    private route: ActivatedRoute, 
    private listingService: ListingService, 
    ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.listingService.getListingById(this.id).subscribe(
      listing => {
        this.listing = listing
        console.log(listing)
        this.populateGallery(this.listing.images);
        if(this.listing.images.length == 0){
          this.hasImage = false;
        }else{
          this.hasImage = true;
        }
      }
    )
  }
  
  populateGallery(images: string[]){
    for(let image of images){
      this.images.push(
        { url: this.imageUrl + "/" + this.id + "/" + image }
      )
    }
  }

  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }
    
  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }
    
  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }
    
  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }
    
  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }
    
  /**************************************************/
    
  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }
 
  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }
 
  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }
  
  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }
 
  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }

}
