import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private _authServie:AuthService, private router:Router) {}

  cancel = ():void => {
    this.router.navigate(['/']);
  }

  logout = ():void => {
    this._authServie.logout();
    this.cancel();
  }

}
