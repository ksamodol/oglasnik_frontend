import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddListingComponent } from './add-listing/add-listing.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { ListingsComponent } from './listings/listings.component';
import { LoginComponent } from './login/login.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: FrontPageComponent},
  { path: 'listings', component: ListingsComponent },
  { path: 'test', component: TestComponent },
  { path: "listing/:id", component: ListingDetailsComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "addListing", component: AddListingComponent, canActivate: [AuthGuardService]},
  { path: "myListings", component: MyListingsComponent , canActivate: [AuthGuardService]},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, 
    { relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'enabled'
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
