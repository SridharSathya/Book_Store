import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewBookComponent } from './addnewbook/addnewbook.component';
import { BooksListComponent } from './booksList/bookslist.component';
import { BooksListResolve, CartListResolve } from './config/APICalls.resolve';
import { HomepageComponent } from './homepage/homepage.component';
import { OrderSuccessComponent } from './orderSuccess/orderSuccess.component';
import { RemoveBookComponent } from './removeBook/removeBook.component';
import { ViewCartComponent } from './viewCart/viewcart.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent},
  { path: 'view-cart', component: ViewCartComponent, resolve: {cartList: CartListResolve} },
  { path: 'books-list', component: BooksListComponent, resolve: {booksList: BooksListResolve} },
  { path: 'add-book', component: AddNewBookComponent },
  { path: 'remove-book', component: RemoveBookComponent, resolve: {booksList: BooksListResolve} },
  { path: 'order-success', component: OrderSuccessComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
