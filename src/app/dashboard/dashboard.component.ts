import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  email: string = ''
  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
     // @ts-ignore
      this.email = user.email;
    })
  }
  signOut(){
    this.auth.signOut();
    return this.router.navigate(['/login']);
  }
}
