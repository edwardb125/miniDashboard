import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AngularFireAuth;
  let routService : Router;
  let snackBar : MatSnackBar;

  beforeEach(async () => {
    const SpyAuth = jasmine.createSpyObj('AngularFireAuth',['signInWithEmailAndPassword'])
    const SpyRouter = jasmine.createSpyObj('Router', ['navigate', 'navigate'])
    const SpySnackBar = jasmine.createSpyObj('MatSnackBar',['open'])


    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: AngularFireAuth, useValue: SpyAuth},
        {provide: Router, useValue: SpyRouter},
        {provide: MatSnackBar, useValue: SpySnackBar}
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    authService = fixture.debugElement.injector.get(AngularFireAuth)
    routService = fixture.debugElement.injector.get(Router)
    snackBar = fixture.debugElement.injector.get(MatSnackBar)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    const obj = {
      user: {
        email: 'gmail',
      }
    }
    // @ts-ignore
    authService.signInWithEmailAndPassword.and.returnValue(
      Promise.resolve(obj)
    )
    //@ts-ignore
    routService.navigate = () => {
      return '/login'
    }
    const final = await component.show()
    expect(snackBar.open).toHaveBeenCalledWith('Hello gmail','', {duration: 3000});
  });

  it('should show enter valid in snackBar', async () => {
    //@ts-ignore
    authService.signInWithEmailAndPassword.and.returnValue(
      Promise.reject('error')
    )
    const final = await component.show()
    expect(snackBar.open).toHaveBeenCalledWith('please enter valid information!','', {duration: 3000});
  })
});
