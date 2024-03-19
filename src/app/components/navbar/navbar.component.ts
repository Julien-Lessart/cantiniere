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
  links:{link:string, visual:string, display:Array<string>}[] = [];
  isLunchlady:boolean = false;
  isLoggedin:boolean = false;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    //We update the current url after each navigation
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.href = this.router.url;
      }
    })

    this.authService.isAuthenticated$.subscribe(() => {
      this.isLunchlady = this.authService.isLunchlady();
      this.isLoggedin = this.authService.isLoggedIn();
    })

    this.links = [
      {link: "/", visual: "<span>Plats de la semaine</span>", display: []},
      {link: "/carte", visual: "<span>Carte</span>", display: []},
      {link: "/login", visual: '<img src="../../../assets/user.svg"/>', display: ["loggedOut"]},
      {link: "/logout", visual: '<img src="../../../assets/logout.svg"/>', display: ["loggedIn"]},
      {link: "/compte", visual: '<img src="../../../assets/user.svg"/>', display: ["isntLunchlady", "loggedIn"]},
      {link: "/panier", visual: '<img src="../../../assets/cart-shopping.svg"/>', display: ["isntLunchlady"]},
      {link: "/recap", visual: '<img src="../../../assets/list.svg"/>', display: ["isLunchlady"]},
      {link: "/userSearch", visual: '<img src="../../../assets/search.svg"/>', display: ["isLunchlady"]},
      {link: "/parameters", visual: '<img src="../../../assets/parameters.svg"/>', display: ["isLunchlady"]},
    ]
  }

  shouldDisplay = (conditions:Array<string>):boolean => {
    if(conditions.includes("loggedIn") && !this.isLoggedin) {
      return false;
    }
    else if(conditions.includes("loggedOut") && this.isLoggedin) {
      return false;
    }

    if(conditions.includes("isLunchlady") && (!this.isLunchlady || !this.isLoggedin)) {
      return false;
    }
    else if(conditions.includes("isntLunchlady") && this.isLunchlady) {
      return false;
    }

    return true;
  }

}
