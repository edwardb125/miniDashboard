import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() email :string='sfsfd'

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }
  signOut(){
    this.auth.signOut();
    console.log("sfjlasdfjafjdsldfksj");
    // this.user.next(null);
    return this.router.navigate(['/login']);
  }

}
