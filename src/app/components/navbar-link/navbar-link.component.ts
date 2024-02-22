import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-link',
  templateUrl: './navbar-link.component.html',
  styleUrl: './navbar-link.component.css'
})
export class NavbarLinkComponent {

  @Input()
  link!:string;

  @Input()
  visual!:string;

  @Input()
  active!:boolean;

}
