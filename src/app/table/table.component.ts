import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, of } from 'rxjs';
import { uniq, flatten } from 'lodash';

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
  joined$: Observable<any> | undefined
  data: any;


  constructor(private af: AngularFirestore, private store: AngularFirestore) { }

  getRecordFromFirestore(result: any){
    return combineLatest([
      this.store.doc('company/' + result.company.id).valueChanges(),
      this.store.doc('project/' + result.project.id).valueChanges(),
      this.store.doc('task/' + result.task.id).valueChanges()
    ]).pipe(
      map(([company, project, task]) => {
        const id = result.id;
        const hours = result.hours;
        return { company, project, task, id, hours}
      })
    )
  }

  getRecord() {
    return this.store.collection('record', ref => ref.orderBy('hours')).valueChanges({idField: 'id'}).pipe(
      switchMap( records => {
        return combineLatest(
          records.map(r => {
            return this.getRecordFromFirestore(r)
          })
        )
      })
    )
  }

  ngOnInit() {
    this.data = this.getRecord().subscribe(result => {
      console.log(result)
      //@ts-ignore
      this.dataSource = result
      console.log(this.dataSource)
    })
  }

  delete(){
    console.log("salam")
  }

}

