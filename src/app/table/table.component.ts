import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest } from 'rxjs';
import { TableService } from './table.service';

export interface PeriodicElement {
  company: string;
  project: string;
  task: string;
  hours: number;
  delete: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  dataSource = [];
  displayedColumns: string[] = ['company', 'project', 'task', 'hours', 'delete'];
  data: any;
  size = 0 ;
  done = false;


  constructor(private tabletService: TableService,
              private af: AngularFirestore,
              private store: AngularFirestore) {}



  ngOnInit() {
    this.data = this.tabletService.getRecord().subscribe(result => {
      //@ts-ignore
      this.dataSource = result
      this.size = result.length;
      this.done = true;
    })
  }

  delete(recordID: any){
      return this.store.doc('record/' + recordID).delete()
  }

}

