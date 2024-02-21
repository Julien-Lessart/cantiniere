import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpModel } from '../login/login.component';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerUserData!:FormGroup;
  configFormRegister:any = { 
    email : new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password : new FormControl('', [Validators.required,Validators.min(2)]), 
    nom : new FormControl('', [Validators.required,Validators.min(2)]), 
    prenom : new FormControl('', [Validators.required,Validators.min(2)]), 
  }
  registerObj = new SignUpModel();

constructor(private _auth: AuthService, private router: Router) {
  this.registerUserData = new FormGroup(this.configFormRegister);
}


onRegister(){
  const localUser = localStorage.getItem('users');
  if(localUser != null){
    const users = JSON.parse(localUser);
    users.push(this.registerObj);
    localStorage.setItem('users', JSON.stringify(users))
  }else{
    const users = [];
    users.push(this.registerObj);
    localStorage.setItem('users', JSON.stringify(users))
  }
  this.registerObj = Object.assign(this.registerObj, this.registerUserData.value);
  this._auth.registerUser(this.registerObj).subscribe(
    res => {
      this._auth.setSession({idToken: res.headers.get('Authorization')});
      this.router.navigate(['/home']);
    },
    err => console.log(err)
  );
}

}
