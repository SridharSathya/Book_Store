import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './config/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  menu: { label: string; link: string; }[];

  constructor(public router: Router, public dataService: DataService){
    this.menu = [{label: 'HOME', link: ''}, {label: 'LIST OF BOOKS', link: '/books-list'}, {label: 'ADD A BOOK', link: '/add-book'}, {label: 'REMOVE A BOOK', link: '/remove-book'}];
  }

  ngOnInit(){

  }
}
