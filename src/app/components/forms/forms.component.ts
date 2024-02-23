import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit{
  @Input()
  fields!:{id:string, label:string, type:string, control:FormControl}[];/* !:[{id:string, label:string, value:string},{id:string, label:string, value:string}] */;/* [{id:'one',label : 'one',value:1},{id:'two',label : 'two',value:2}] */
  
  @Output()
  newItemEvent = new EventEmitter<any>();

  form=new FormGroup({});
  submitted: boolean = false;

  ngOnInit()
  {
    this.fields.forEach(x=>{
      this.form.addControl(x.id, x.control);
      // if(x.isMail){
      //   this.form.addControl(x.id,new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]));
      // }
      // if(x.isPassword){
      //   this.form.addControl(x.id,new FormControl('', [Validators.required,Validators.min(5)]));
      // }
      // if(!x.isMail && !x.isPassword){
      //   this.form.addControl(x.id,new FormControl('', [Validators.required,Validators.min(2)]));
      // }
    });
  }

  handleSubmitForm(): boolean {
    this.submitted = true;
    if (this.form.valid) {
        this.pushData();
        return true;
    } else {
        console.log("Nouveau produit invalide", this.form.value);
        return false;
    }
}
pushData(){
  this.newItemEvent.emit(this.form.value);
}
}
