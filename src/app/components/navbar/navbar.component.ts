import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  //The current relative url
  href:string = "";

  constructor(private router: Router) {}

  ngOnInit() {
    //We update the current relative url after each navigation
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.href = this.router.url;
      }
    })
  }

}
