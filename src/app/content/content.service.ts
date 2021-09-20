import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ContentComponent } from './content.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface obj{

}

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private store: AngularFirestore, private _snackBar: MatSnackBar) { }

  saveInformation(data : object){
    //@ts-ignore
    this.store.collection('record').doc(data.id).set({
    //@ts-ignore
    company: this.store.doc('/company/' + data.companyID).ref,
    //@ts-ignore
    project: this.store.doc('/project/' + data.projectID).ref,
    //@ts-ignore
    task: this.store.doc('/task/' + data.taskID).ref,
    //@ts-ignore
    hours: data.hours
    })
    this._snackBar.open("Added successfully", '',{
      duration: 3000
    })
  }
}
