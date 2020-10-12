import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteCallService } from '../config/config.service';
import { DataService } from '../config/data.service';
import { GridComponent } from '../forms/grid/grid.component';
import { SnackBarComponent } from '../forms/snackbar/snackbar.component';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html'
})

export class ViewCartComponent implements OnInit {

  columnsToDisplay = [];
  headers = [];
  dataSource = [];

  @ViewChild('grid') grid: GridComponent;

  constructor(public router: Router, private activatedRoute: ActivatedRoute, private remoteService: RemoteCallService, private snackBar: MatSnackBar, private dataService: DataService){}

  ngOnInit(){
    this.columnsToDisplay = ['refID', 'title', 'author', 'edition', 'removeFromCart'];
        // Getting books list from backend
    this.headers = [{ key: 'refID', header: 'Reference ID' }, { key: 'title', header: 'Title' }, { key: 'author', header: 'Author' }, { key: 'edition', header: 'Edition' }, { key: 'removeFromCart', header: 'Remove From Cart' }];
    this.activatedRoute.data.subscribe(apiData => {
      this.dataSource = apiData.cartList.cartList;
      this.dataSource.forEach(d => {
        d.removeFromCart = { type: 'icon', src: 'clear.svg', label: 'remove_from_cart' };
      });
    });
  }
  emptyCart() {
    this.remoteService.sendRequest('get', 'clearCart').subscribe(res => {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: 'bgThemeColor4',
        data: 'Cart has been cleared successfully'
      });
      this.dataService.storeData.addedToCart = false;
      this.dataSource = [];
    });
  }

  iconActionEvent(event){
    // If the user clicks 'Remove from cart' icon
    if (event.removeFromCart.label === 'remove_from_cart') {
      this.remoteService.sendRequest('post', 'removeBookFromCart', { refID: event.refID }).subscribe(res => {
        const ind = this.dataSource.findIndex(f => f.refID === event.refID);
        this.dataSource.splice(ind, 1);
        this.grid.dataSource._updateChangeSubscription();
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'bgThemeColor4',
          data: 'Book ID ' + event.refID + ' removed from cart successfully'
        });
        this.dataService.storeData.addedToCart = this.dataSource.length > 0;
      });
    }
  }
}
