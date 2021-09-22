import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import {ContentService} from "./content.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFirestore} from "@angular/fire/compat/firestore";

describe('ContentComponent', () => {
  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  let contentService: ContentService;
  let snackBar: MatSnackBar;
  let afs: AngularFirestore;
  let store: AngularFirestore;


  beforeEach(async () => {
    const SpyService = jasmine.createSpyObj('ContentService',[])
    const SpySnack = jasmine.createSpyObj('MatSnackBar',[])
    const SpyAfs = jasmine.createSpyObj('AngularFirestore',[])
    const SpyStore = jasmine.createSpyObj('AngularFirestore',[])
    await TestBed.configureTestingModule({
      declarations: [ ContentComponent ],
      providers: [
        {provide: ContentService, useValue: SpyService},
        {provide: MatSnackBar, useValue: SpySnack},
        {provide: AngularFirestore, useValue: SpyAfs},
        {provide: AngularFirestore, useValue: SpyStore}

      ]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
