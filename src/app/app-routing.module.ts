import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { ListingsComponent } from './listings/listings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'listings', component: ListingsComponent },
  { path: 'test', component: TestComponent },
  { path: "listing/:id", component: ListingDetailsComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "addListing", component: AddListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
