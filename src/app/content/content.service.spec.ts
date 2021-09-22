import { MatSnackBar } from '@angular/material/snack-bar';
import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { ContentService } from './content.service';

describe('ContentService', () => {
  let service: ContentService;
  let store: jasmine.SpyObj<AngularFirestore>;
  let _snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('AngularFirestore', ['collection', 'doc']);
    const snackSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({providers:[
      ContentService,
      {provide : AngularFirestore, useValue: storeSpy},
      {provide : MatSnackBar, useValue: snackSpy}
    ]});
    service = TestBed.inject(ContentService);
    store = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
    _snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should call snackbar', () => {
    const data = {
      companyID : "aaaa"
    }
    // @ts-ignore
    store.collection.withArgs('record').and.returnValue({
      // @ts-ignore
      doc : (x) =>{
        return ({
          set: () =>{

          }
        })
    }
    })

    store.doc.and.returnValue({
      // @ts-ignore
      ref: 'done'
    })

    service.saveInformation({})
    expect(_snackBar.open).toHaveBeenCalledWith('Added successfully','', {duration: 3000});

  });
});
