import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RemoteCallService } from '../config/config.service';
import { SnackBarComponent } from '../forms/snackbar/snackbar.component';

@Component({
  selector: 'app-addnewbook',
  templateUrl: './addnewbook.component.html'
})

export class AddNewBookComponent implements OnInit {

    addBookForm: FormGroup;
    refIDExists = false;

    constructor(private fb: FormBuilder, private remoteService: RemoteCallService, private snackBar: MatSnackBar, private router: Router){}

    ngOnInit(){
      this.addBookForm = new FormGroup({
        refID: new FormControl('', Validators.required),
        title: new FormControl('', Validators.required),
        author: new FormControl('', Validators.required),
        edition: new FormControl('', Validators.required),
      });
    }

    add(){
      this.refIDExists = false;
      this.remoteService.sendRequest('post', 'addBookToStore', this.addBookForm.value).subscribe(res => {
        if (res.added){
          this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: 'bgThemeColor4',
            data: 'New Book added to Store successfully'
          });
          this.router.navigate(['books-list']);
        }
        else{
          this.refIDExists = true;
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
