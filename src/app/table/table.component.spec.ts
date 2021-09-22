import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TableService} from "./table.service";
import {of} from "rxjs";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let store: AngularFirestore;
  let tableService: TableService;

  beforeEach(async () => {
    const SpyTableService = jasmine.createSpyObj('TableService',['get', 'getRecord'])
    const SpyStore = jasmine.createSpyObj('AngularFirestore', ['doc'])

    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      providers: [
        {provide: AngularFirestore, useValue: SpyStore},
        {provide: TableService, useValue: SpyTableService}
      ]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    store = fixture.debugElement.injector.get(AngularFirestore)
    tableService = fixture.debugElement.injector.get(TableService)
    const result = {
      length : 5,
    }
    //@ts-ignore
    tableService.getRecord.and.returnValue(
      of(result)
    )
    fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    component.ngOnInit()
    expect(component.size).toEqual(5);
  });
});
