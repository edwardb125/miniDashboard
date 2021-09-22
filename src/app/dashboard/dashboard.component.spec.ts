import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService : AngularFireAuth;
  let routService : Router;

  beforeEach(async () => {
    const SpyAuth = jasmine.createSpyObj('AngularFireAuth',['signOut','onAuthStateChanged'])
    const SpyRouter = jasmine.createSpyObj('Router', ['navigate', 'navigate'])

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        {provide: AngularFireAuth, useValue: SpyAuth},
        {provide: Router, useValue: SpyRouter}
      ]}).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    authService = fixture.debugElement.injector.get(AngularFireAuth)
    routService = fixture.debugElement.injector.get(Router)
    // @ts-ignore
    authService.onAuthStateChanged = (x) => {
      return Promise.resolve
    }
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return router navigate to /login', () => {
    // @ts-ignore
    authService.onAuthStateChanged = (x) => {
      return {}
    }
    // @ts-ignore
    authService.signOut = () => {}
    // @ts-ignore
    routService.navigate = () => {
      return '/login'
    }
    const final = component.signOut()
    // @ts-ignore
    expect(final).toEqual('/login');
  });

  it('should test ngOnInit', () => {
    // @ts-ignore
    authService.onAuthStateChanged = (x) => {
      // @ts-ignore
     x({email:"ff"})
    }
    component.ngOnInit()
    fixture.detectChanges();

    // @ts-ignore
    expect(component.email).toEqual("ff")
  })
});
