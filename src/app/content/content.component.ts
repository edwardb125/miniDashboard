import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {first, map, startWith} from 'rxjs/operators';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

export interface Item { name: string;
  id: string; }

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {
    showForm = new FormGroup({
      company: new FormControl('')
    });

  company : any[] = [];
  private itemsCollection : AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  projectItem!: Observable<Item[]>;

  constructor(private _snackBar: MatSnackBar, private afs: AngularFirestore, private store: AngularFirestore){
    this.itemsCollection = afs.collection<Item>('company');
    this.items = this.itemsCollection.valueChanges({idField: "id"})
    // console.log(this.items)
  // @ts-ignore
    // this.company = this.items;
  }

  addItem(item: Item){
    this.itemsCollection.add(item);
  }


  findProject(){
    const companyRefrence = this.store.doc('company/' + this.showForm.get('company')?.value).ref
    this.projectItem = this.store.collection<Item>('project', ref => ref.where('company', '==', companyRefrence)).valueChanges({ idField: "id"})
    //@ts-ignore
    // this.store.collection<Item>('project', ref => ref.where('company', '==', companyRefrence)).valueChanges().subscribe(result => {
    //   console.log(result)
    // })
    // console.log(this.projectItem)
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
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
