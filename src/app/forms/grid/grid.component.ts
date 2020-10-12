import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit {
  @Input() dataSource;
  @Input() columnsToDisplay = [];
  @Input() headers = [];
  @Output() iconActionEvent = new EventEmitter();
  
  ngOnInit(){
    this.dataSource = new MatTableDataSource(this.dataSource);
  }

  iconAction(element){
    this.iconActionEvent.emit(element);
  }

}
