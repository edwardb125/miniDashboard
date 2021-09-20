import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

export interface Item { name: string; id: string; }

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {
    showForm = new FormGroup({
      company: new FormControl(''),
      project: new FormControl(''),
      task: new FormControl(''),
      hours: new FormControl('')
    });

  private itemsCollection : AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  projectItem!: Observable<Item[]>;
  taskItem!: Observable<Item[]>;

  constructor(private _snackBar: MatSnackBar, private afs: AngularFirestore, private store: AngularFirestore){
    this.itemsCollection = afs.collection<Item>('company');
    this.items = this.itemsCollection.valueChanges({idField: "id"})
  }

  async save(){
    const id = this.store.createId()
    const companyID = this.showForm.get('company')?.value;
    const projectID = this.showForm.get('project')?.value;
    const taskID = this.showForm.get('task')?.value;
    const hours = this.showForm.get('hours')?.value;

    console.log(companyID)
    console.log(projectID)
    console.log(taskID)
    console.log(hours)
    console.log(id)

    this.store.collection('record').doc(id).set({
      company: this.store.doc('/company/' + companyID).ref,
      project: this.store.doc('/project/' + projectID).ref,
      task: this.store.doc('/task/' + taskID).ref,
      hours: hours
    })

  }

  findProject(){
    const companyRefrence = this.store.doc('company/' + this.showForm.get('company')?.value).ref
    this.projectItem = this.store.collection<Item>('project', ref => ref.where('company', '==', companyRefrence)).valueChanges({ idField: "id"})
  }

  findTask(){
    const projectRefrence = this.store.doc('project/' + this.showForm.get('project')?.value).ref
    this.taskItem = this.store.collection<Item>('task', ref => ref.where('project', '==', projectRefrence)).valueChanges({ idField: "id"})
  }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      console.log('heellloo')
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
