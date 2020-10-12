import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RemoteCallService } from '../config/config.service';
import { SnackBarComponent } from '../forms/snackbar/snackbar.component';

@Component({
  selector: 'app-removebook',
  templateUrl: './removeBook.component.html'
})

export class RemoveBookComponent implements OnInit {

    columnsToDisplay = [];
    headers = [];
    dataSource = [];
    displayGrid = false;

    constructor(private activatedRoute: ActivatedRoute, private remoteService: RemoteCallService, private snackBar: MatSnackBar){}

    ngOnInit(){
    // Getting books list from backend
    this.columnsToDisplay = ['refID', 'title', 'author', 'edition', 'removeFromStore'];
    this.headers = [{ key: 'refID', header: 'Reference ID' }, { key: 'title', header: 'Title' }, { key: 'author', header: 'Author' }, { key: 'edition', header: 'Edition' }, { key: 'removeFromStore', header: 'Remove From Store' }];
    this.activatedRoute.data.subscribe(apiData => {
      this.pushGridData(apiData.booksList.booksList);
      this.displayGrid = true;
    });
    }

    iconActionEvent(event){
      this.remoteService.sendRequest('post', 'removeBookFromStore', event).subscribe(res => {
        this.displayGrid = false;
        this.remoteService.sendRequest('get', 'getBooksList').subscribe(response => {
          this.pushGridData(response.booksList);
          this.displayGrid = true;
        });
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'bgThemeColor4',
          data: 'Book ID ' + event.refID + ' removed from cart successfully'
        });
      });
    }

    pushGridData(arr){
      this.dataSource = [];
      arr.forEach(d => {
        d.removeFromStore = { type: 'icon', src: 'remove_circle.svg', label: 'remove_from_store' };
        if (d.status.toLowerCase() === 'available') {
          this.dataSource.push(d);
        }
      });
    }


  resetBooksList() {
    this.remoteService.sendRequest('get', 'resetBooksList').subscribe(res => {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: 'bgThemeColor4',
        data: 'List of books have been reset successfully'
      });
    });
  }

}
