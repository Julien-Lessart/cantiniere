import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpModel } from '../login/login.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @Input()
  fieldsUser = [{id:'nom', label:'Nom', control: new FormControl('', [Validators.required,Validators.min(2)]), type: "text"}, {id:'prenom', label:'Prenom', control: new FormControl('', [Validators.required,Validators.min(2)]), type: "text"}, {id:'email', label:'E-mail', control: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]), type: "email"}, {id:'password', label:'Mot de passe', control: new FormControl('', [Validators.required,Validators.min(2)]), type: "password"}];
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


onRegister(user:SignUpModel){
  /* const localUser = localStorage.getItem('users');
  if(localUser != null){
    const users = JSON.parse(localUser);
    users.push(this.registerObj);
    localStorage.setItem('users', JSON.stringify(users))
  }else{
    const users = [];
    users.push(this.registerObj);
    localStorage.setItem('users', JSON.stringify(users))
  } */
  console.log(user);
  this.registerObj = Object.assign(this.registerObj, user);
  this._auth.registerUser(this.registerObj).subscribe(
    res => {
      this.router.navigate(['/login']);
    },
    err => console.log(err)
  );
}

}
