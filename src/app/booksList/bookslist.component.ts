import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RemoteCallService } from '../config/config.service';
import { DataService } from '../config/data.service';
import { SnackBarComponent } from '../forms/snackbar/snackbar.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './bookslist.component.html'
})
export class BooksListComponent implements OnInit {

  columnsToDisplay = [];
  headers = [];
  dataSource = [];

  constructor(private activatedRoute: ActivatedRoute, private remoteService: RemoteCallService, private snackBar: MatSnackBar, public router: Router, private dataService: DataService) { }

  ngOnInit() {
    // Getting books list from backend
    this.columnsToDisplay = ['refID', 'title', 'author', 'edition', 'status', 'addToCart'];
    this.headers = [{ key: 'refID', header: 'Reference ID' }, { key: 'title', header: 'Title' }, { key: 'author', header: 'Author' }, { key: 'edition', header: 'Edition' }, { key: 'status', header: 'Availabilty Status' }, { key: 'addToCart', header: 'Add To Cart' }];
    this.activatedRoute.data.subscribe(apiData => {
      this.dataSource = apiData.booksList.booksList;
      this.dataSource.forEach(d => {
        if (d.status.toLowerCase() === 'available') {
          d.addToCart = { type: 'icon', src: 'add_circle.svg', label: 'add_to_cart' };
        }
      });
    });
  }

  iconActionEvent(event) {
    // If the user clicks 'Add to cart' icon
    if (event.addToCart.label === 'add_to_cart') {
      this.remoteService.sendRequest('post', 'addBookToCart', event).subscribe(res => {
        const ind = this.dataSource.findIndex(f => f.refID === event.refID);
        this.dataSource[ind].status = 'Added to Cart  ';
        this.dataSource[ind].addToCart = { type: 'icon', src: 'remove_circle.svg', label: 'remove_from_cart' };
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'bgThemeColor4',
          data: 'Book ID ' + event.refID + ' added to cart successfully'
        });
        this.dataService.storeData.addedToCart = true;
      });
    }
    // If the user clicks 'Remove from cart' icon
    if (event.addToCart.label === 'remove_from_cart') {
      this.remoteService.sendRequest('post', 'removeBookFromCart', { refID: event.refID }).subscribe(res => {
        const ind = this.dataSource.findIndex(f => f.refID === event.refID);
        this.dataSource[ind].status = 'Available';
        this.dataSource[ind].addToCart = { type: 'icon', src: 'add_circle.svg', label: 'add_to_cart' };
        // Retaining cart notification if there is even one book added to cart
        this.dataSource.forEach(d => {
          if (d.addToCart && d.addToCart.label === 'remove_from_cart'){
            this.dataService.storeData.addedToCart = true;
          }
        });
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'bgThemeColor4',
          data: 'Book ID ' + event.refID + ' removed from cart successfully'
        });
      });
    }
  }

}
