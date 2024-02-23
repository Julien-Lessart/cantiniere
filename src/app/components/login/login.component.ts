import { Component, Input } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService  } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Input()
  fieldsUser = [{id:'email', label:'E-mail', control: new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]), type: "email"}, {id:'password', label:'Mot de passe', control: new FormControl('', [Validators.required,Validators.min(2)]), type: "password"}];
  loginUserData!:FormGroup;
  configFormLogin:any = { 
    email : new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password : new FormControl('', [Validators.required,Validators.min(2)]), 
  }
  loginObj =  new SignInModel();

constructor(private _auth: AuthService, private router:Router) {
  this.loginUserData = new FormGroup(this.configFormLogin);
}

objectsHaveSameKeys(...objects:any[]) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every(object => union.size === Object.keys(object).length);
}

onLogin(user:SignInModel){
  if(this._auth.isLoggedOut()){
    this.loginObj = Object.assign({}, user);
    this._auth.loginUser(this.loginObj).subscribe(
      res => {
        /* const configSession:[{}] = [{}];
        const localUser = JSON.parse(localStorage.getItem('user') || "{}");
        if(this.objectsHaveSameKeys(localUser, this.loginObj)){
           configSession.push({idToken: res.headers.get('Authorization')});
           this.router.navigate(['/home']);
        }else{
          const user = [];
          user.push(this.loginObj);
          configSession.push({idToken: res.headers.get('Authorization'), user:JSON.stringify(user)});
        } */
        const configSession:[{}] = [{}];
        const user = [];
        user.push(this.loginObj);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(res.headers.get('Authorization') || "");
        configSession.push({idToken: res.headers.get('Authorization'), user:decodedToken});
        this._auth.setSession(configSession);
      /* this._auth.setUser(this.loginObj.email); */
      /* this.router.navigate(['/home']); */
      },
      err => console.log(err)
      );
      this.router.navigate(['/']);
    }
  }
}

export class SignInModel {
  email!:string;
  password!:string;
}

export class SignUpModel {
  email!:string;
  password!:string;
  nom!:string;
  prenom!:string;
  address:string = "";
  wallet:number = 0;
  postalCode:string = "";
  isLunchLady:boolean = false;
  phone:string = "";
  town:string = "";
  sex:number =  0;
  image:object = {}
}

