import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { BooksListComponent } from './booksList/bookslist.component';
import { GridComponent } from './forms/grid/grid.component';
import { RemoteCallService } from './config/config.service';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { ViewCartComponent } from './viewCart/viewcart.component';
import { SnackBarComponent } from './forms/snackbar/snackbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewBookComponent } from './addnewbook/addnewbook.component';
import { RemoveBookComponent } from './removeBook/removeBook.component';
import { OrderSuccessComponent } from './orderSuccess/orderSuccess.component';
import { DataService } from './config/data.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    AppComponent,
    HomepageComponent,
    BooksListComponent,
    GridComponent,
    FooterComponent,
    ViewCartComponent,
    SnackBarComponent,
    AddNewBookComponent,
    RemoveBookComponent,
    OrderSuccessComponent
  ],
  providers: [
    DataService,
    RemoteCallService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
