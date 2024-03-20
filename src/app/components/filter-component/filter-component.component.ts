import { Component, EventEmitter, Input, Output } from '@angular/core';
import Meal from '../../models/meal.model';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrl: './filter-component.component.css',
})
export class FilterComponentComponent {
  @Input() filteredOptions:Meal[] = []
   weekday:Array<string> = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi"];

   @Output()
   newItemEvent = new EventEmitter<any>();
  filteredOption?: number = new Date().getDay() ;
  /*
  ngOnInit(): void {
    this.filteredOption = this.filteredOptions[0].data;
  }
  */
indexSelected = new Date().getDay()- 1;
  setValue(filter: number) {
   this.indexSelected = filter
    this.newItemEvent.emit(this.filteredOption = filter+1);
    console.log(this.filteredOption);
  }
}
