import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compte-page',
  templateUrl: './compte-page.component.html',
  styleUrl: './compte-page.component.css'
})
export class ComptePageComponent implements OnInit{
  userData:any = JSON.parse(localStorage.getItem("user") || "");

  ngOnInit(): void {
    console.log(this.userData.wallet);
  }
}
