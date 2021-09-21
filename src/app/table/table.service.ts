import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private store: AngularFirestore,) { }

  getRecord() {
    return this.store.collection('record', ref => ref.orderBy('hours')).valueChanges({idField: 'id'}).pipe(
      switchMap( records => {
        return combineLatest(
          records.map(answer => {
            return this.getRecordFromFirestore(answer)
          })
        )
      })
    )
  }

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


}
