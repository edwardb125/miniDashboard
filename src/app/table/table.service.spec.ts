import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { TableService } from './table.service';
import {of} from "rxjs";

describe('TableService', () => {
  let service: TableService;
  let store: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('AngularFirestore', ['collection','doc']);
    TestBed.configureTestingModule({providers:[
        TableService,
        {provide: AngularFirestore, useValue: storeSpy}
      ]});
    service = TestBed.inject(TableService);
    store = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
  });

  it('should return 5 attributes in one object', () => {
    const input = {
      company: { id : "Pg0dK2QSBT6JX3P0G1Hv"},
      project: { id : "CrhWQ3NeCcIGlLCUwzrm"},
      task: { id : "80BCc9ljG47OZvfXOMJA"},
      id: "11111",
      hours: 4
    };

    const output = {
      company : { name : 'binance'},
      project : { name : 'sell'},
      task : { name : 'dashboard'},
      id : '11111',
      hours : 4
    };

    // @ts-ignore
    store.doc.withArgs('company/' + input.company.id).and.returnValue({
      valueChanges: () => {
        return of({name: "binance"})
    }
    })
    // @ts-ignore
    store.doc.withArgs('project/' + input.project.id).and.returnValue({
      valueChanges: () => {
        return of({name: "sell"})
      }
    })
    // @ts-ignore
    store.doc.withArgs('task/' + input.task.id).and.returnValue({
      valueChanges: () => {
        return of({name: "dashboard"})
      }
    })
    // console.log(result)
    const obj = service.getRecordFromFirestore(input)
    obj.subscribe(x => {
      console.log(x)
      console.log(output)
      expect(x).toEqual(output)
    })
  });
});
