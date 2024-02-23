import { Component, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstraintsService } from '../../Services/constraints/constraints.service';

@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrl: './constraints.component.css'
})
export class ConstraintsComponent {

  fieldsConstraints!:{id:string, label:string, type:string, control:FormControl}[]
  currentConstraints!:{orderTimeLimit:string, maximumOrderPerDay:number, rateVAT:number};
  
  form:FormGroup = new FormGroup({});

  constructor (private _constraintsService:ConstraintsService) {}

  ngOnInit(): void {
    this._constraintsService.getConstraints().subscribe(
      res => {
        this.currentConstraints = {
          orderTimeLimit: res.body.orderTimeLimit,
          maximumOrderPerDay: res.body.maximumOrderPerDay,
          rateVAT: res.body.rateVAT
        };
      }
    );

    this.fieldsConstraints = [
      {
        id:'maximumOrderPerDay',
        label:'Nombre limite de plat :',
        type: "number",
        control: new FormControl(this.currentConstraints.maximumOrderPerDay, [Validators.required,Validators.min(1)])
      },
      {
        id:'orderTimeLimit',
        label:'Heure limite pour passer commande :', 
        type: "time",
        control: new FormControl(this.currentConstraints.orderTimeLimit, [Validators.required,Validators.min(1)])
      }
    ];

    this.fieldsConstraints.forEach(field => {
      this.form.addControl(field.id, field.control);
    })
  }

  onSubmit = (event:{maximumOrderPerDay: number, orderTimeLimit: string}):void => {
    this.currentConstraints.orderTimeLimit = event.orderTimeLimit;
    this.currentConstraints.maximumOrderPerDay = event.maximumOrderPerDay;
    this._constraintsService.patchConstaints(this.currentConstraints).subscribe();
  }

  
}
