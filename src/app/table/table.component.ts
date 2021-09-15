import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  delete: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', delete: 'd'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', delete: 'd'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', delete: 'd'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', delete: 'd'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', delete: 'd'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', delete: 'd'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', delete: 'd'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', delete: 'd'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', delete: 'd'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', delete: 'd'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'delete'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
