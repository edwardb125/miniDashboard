import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private auth: AngularFireAuth, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  show(){
    // console.log(this.loginForm.get("email")?.value);
    const email = this.loginForm.get('email')?.value
    const password = this.loginForm.get('password')?.value

    this.auth.signInWithEmailAndPassword(email, password).then(result => {
      this._snackBar.open("Hello " + result.user?.email, '',{
        duration: 3000
      });
      // console.log(result)
      return this.router.navigate(['/dashboard']);
      }
    ).catch(()=>{
      console.log("error !");
      this._snackBar.open("please enter valid information!", '',{duration: 3000});
    })
  }
  }

