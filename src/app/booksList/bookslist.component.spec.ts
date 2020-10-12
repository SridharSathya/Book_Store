import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RemoteCallService } from '../config/config.service';
import { DataService } from '../config/data.service';

import { BooksListComponent } from './bookslist.component';

describe('AddNewBookComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksListComponent ],
      providers: [
        {provide: ActivatedRoute,  useValue: {
            data: of({booksList : { booksList : [{ status : "available"}]}})
          }},
        {provide: FormBuilder, useValue: {}},
        {provide: MatSnackBar, useValue: {openFromComponent: (data1, data2) => {}}},
        {provide: Router, useValue: {navigate: () => {}}},
        {provide: RemoteCallService, useValue:{sendRequest: (data1, data2, data3) => {
            return of({
                data: [
                  { id: 1, first_name: 'George', last_name: 'Bluth', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg' },
                  { id: 2, first_name: 'Janet', last_name: 'Weaver', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg' },
                  { id: 3, first_name: 'Emma', last_name: 'Wong', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg' },
                ],
              });
        }}},
        {provide: DataService, useValue:{ 
          storeData : {  addToCart : false}
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add add_to_cart', () => {
    component.dataSource = [{ refID : "abc",addToCart : ""}]
    component.iconActionEvent({ addToCart : { label: "add_to_cart",refID : "abc"}});
    expect(component).toBeTruthy();
  });

  it('should add remove_from_cart', () => {
    component.iconActionEvent({ addToCart : { label: "remove_from_cart"}});
    expect(component).toBeTruthy();
  });
});