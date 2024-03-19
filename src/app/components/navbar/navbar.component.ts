import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  //The current url
  href:string = "";

  /**
   * All the links accessible by the navbar
   * link: the link to the page
   * visual: the innerHTML of the link
   * display: Should the link be displayed to current user
   */
  links:{link:string, visual:string, display:boolean}[] = [];

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    //We update the current url after each navigation
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.href = this.router.url;
      }
    })

    this.links = [
      {link: "/", visual: "<span>Plats de la semaine</span>", display: true},
      {link: "/carte", visual: "<span>Carte</span>", display: true},
      {link: "/login", visual: '<img src="../../../assets/user.svg"/>', display: this.authService.isLoggedOut()},
      {link: "/logout", visual: '<img src="../../../assets/logout.svg"/>', display: this.authService.isLoggedIn()},
      {link: "/compte", visual: '<img src="../../../assets/user.svg"/>', display: this.authService.isLoggedIn() && !this.authService.isLunchlady()},
      {link: "/panier", visual: '<img src="../../../assets/cart-shopping.svg"/>', display: !this.authService.isLunchlady()},
      {link: "/recap", visual: '<img src="../../../assets/list.svg"/>', display: this.authService.isLunchlady()},
      {link: "/userSearch", visual: '<img src="../../../assets/search.svg"/>', display: this.authService.isLunchlady()},
      {link: "/parameters", visual: '<img src="../../../assets/parameters.svg"/>', display: this.authService.isLunchlady()},
    ]
  }

}
