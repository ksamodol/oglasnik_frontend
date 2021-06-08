import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { ListingsComponent } from './listings/listings.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'listings', component: ListingsComponent },
  { path: 'test', component: TestComponent },
  { path: "listing/:id", component: ListingDetailsComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
