import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  show(){
    // this.auth.signOut();
    console.log(this.loginForm.get("email")?.value);
    const email = this.loginForm.get('email')?.value
    // @ts-ignore
    const password = this.loginForm.get('password').value

    this.auth.signInWithEmailAndPassword(email, password).then(result => {
      // @ts-ignore
      console.log(result)
      return this.router.navigate(['/dashboard']);
      }
    ).catch(()=>{
      console.log("error !");
    })
  }
  }

