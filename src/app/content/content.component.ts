import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {first, map, startWith} from 'rxjs/operators';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

export interface Item { name: string;}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit {
  company : any[] = [];
  private itemsCollection : AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private _snackBar: MatSnackBar, private afs: AngularFirestore){
    // this.itemDoc = afs.doc<Item>('task');
    // // @ts-ignore
    // this.item = this.itemDoc.valueChanges();

    this.itemsCollection = afs.collection<Item>('company');
    this.items = this.itemsCollection.valueChanges();
   // @ts-ignore
    this.company = this.items;
  }

  addItem(item: Item){
    this.itemsCollection.add(item);
  }

  // update(item: Item){
  //   this.itemDoc.update(item);
  // }

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
