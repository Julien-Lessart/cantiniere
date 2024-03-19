import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { OrderService, order } from '../../services/order/order.service';
import { table } from '../../models/table.model';
import { ModalService } from '../../services/modal/modal.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-compte-page',
  templateUrl: './compte-page.component.html',
  styleUrl: './compte-page.component.css'
})
export class ComptePageComponent implements OnInit{
  dataTable:Array<table> = [];
  dataHeader:Array<keyof table> = ['jour', 'designation', 'prix'];
  private currentDate: any = new Date();
  calculateWeek = () => {
    const startDate: any = new Date(this.currentDate.getFullYear(), 0, 1);
    let days = Math.floor(
      (this.currentDate - startDate) / (24 * 60 * 60 * 1000)
    );

    let weekNumber = Math.ceil(days / 7);
    return weekNumber;
  };

  constructor(private _order:OrderService, private _modal:ModalService, private _auth:AuthService, private router:Router){}
  userData:any = JSON.parse(localStorage.getItem("user") || "");
  wallet!:string;
  test:order[] = [];
  ngOnInit(): void {
    this.wallet = this.userData.wallet;
    this._order.getAllOrderForUser(parseInt(this.userData.id)).subscribe(res => {
      res.sort((a, b) => a.quantity[0].meal.priceDF - b.quantity[0].meal.priceDF);
      const thisWeekNumber = this.calculateWeek();
      const weekday:Array<string> = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
      for(let i = 0; i < res.length; i++){
        if(res[i].status === 'CREATED'){
          if(thisWeekNumber === res[i].quantity[0].meal.availableForWeeksAndDays.values[0].week){
            const temp:table = { 
              nom:'',
              prenom:'',
              email:'',
              jour: weekday[res[i].quantity[0].meal.availableForWeeksAndDays.values[0].day],
              designation: res[i].quantity[0].meal.label,
              prix: res[i].quantity[0].meal.priceDF.toString(),
              modification:true,
              delete:true,
              compte:false,
              id: res[i].id
            }
            this.dataTable.push(temp);
          }
        }
      }
    });
  }

  onUserInput(data:{id:number, str:string}){  
    if(data.str === 'delete'){
      this._order.cancelOrder(data.id).subscribe(res =>{
        this.dataTable.splice(1,this.dataTable.findIndex(value => value.id === data.id));
      });   
    }
  }


  @ViewChild('view', { static: true, read: ViewContainerRef })
  vcr!: ViewContainerRef;

  openModalTemplate(view: TemplateRef<Element>) {
    this._modal.open(this.vcr, view, {
      animations: {
        modal: {
          enter: 'enter-slide-down 0.8s',
        },
        overlay: {
          enter: 'fade-in 0.8s',
          leave: 'fade-out 0.3s forwards',
        },
      },
      size: {
        width: '50em',
        height: 'fit-content'
      },
    });
  }

  onClickValiderDelete():void {
    
    this._auth.deleteUser(this.userData.id).subscribe((res) =>{
      console.log(res);
      this._auth.logout();
      this.close();
      
      this.router.navigate(['/home']);
    });
  }

  onClickAnnuler():void {
    this.close();
  }
  
  close():void{
    this._modal.close();
  }
}


