import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RemoteCallService } from '../config/config.service';

import { AddNewBookComponent } from './addnewbook.component';

describe('AddNewBookComponent', () => {
  let component: AddNewBookComponent;
  let fixture: ComponentFixture<AddNewBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBookComponent ],
      providers: [
        {provide: FormBuilder, useValue: {}},
        {provide: MatSnackBar, useValue: {openFromComponent: (data1, data2) => {}}},
        {provide: Router, useValue: {navigate: () => {}}},
        {provide: RemoteCallService, useValue:{sendRequest: (data1, data2, data3) => {
            return of({
                added : true
              });
        }}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add', () => {
    component.add();
    expect(component).toBeTruthy();
  });


  it('should resetBooksList', () => {
    component.resetBooksList();
    expect(component).toBeTruthy();
  });
});