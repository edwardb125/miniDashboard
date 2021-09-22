import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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
      ]})
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

  it('should create', () => {
    const obj = {
      user: {
        email: 'erfan@gmail.com',
      }
    }
    component.loginForm.get("email")?.setValue('erfan@gmail.com')
    component.loginForm.get("password")?.setValue('1111')
    // @ts-ignore
    authService.signInWithEmailAndPassword.and.returnValue({
      return promise.resolve(obj)
    })
    const final = component.show()
    expect(snackBar.open).toHaveBeenCalledWith('Hello'+obj.user.email,'', {duration: 3000});

    //@ts-ignore
    // routService.navigate = () => {
    //   return '/login'
    // }
    // expect(component).toBeTruthy();
  });




  it('should show enter valid in snackBar', () => {
    expect(snackBar.open).toHaveBeenCalledWith('please enter valid information!','', {duration: 3000});
  })
});
