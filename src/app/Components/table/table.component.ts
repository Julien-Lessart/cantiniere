/**
 * A besoin de données en @Input :
 *  [tableData]="yourData" qui utilisent le model table
 *  [tableHeader]="yourHeaderData" qui utilisent le model table
 *  Array<table> = [
    {
      jour:'Lundi', 
      designation:'Chocolat', 
      prix:'5',
      nom:'',
      prenom:'',
      email:'',
      modification:true,
      delete:true,
      compte:false
    },...
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { table} from '../../models/table.model';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{

  @Input() tableData!:Array<table>;
  @Input() tableHeader!:Array<keyof table>;
  @Output() newItemEvent = new EventEmitter<any>();
  sorting: SortingInterface = {
    column:'prix',
    order:'desc'
  }
  
  
  ngOnInit(){
  }

  capitalize(str:string):string{
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  isDescSorting(column:string):boolean{
    return this.sorting.column === column && this.sorting.order ==='desc';
  }
  
  isAscSorting(column:string):boolean{
    return this.sorting.column === column && this.sorting.order ==='asc';
  }

  sortTable(column:string):void{
    const futureSortignOrder = this.isDescSorting(column) ? 'asc' : 'desc';
    if(this.isAscSorting(column) && column === 'prix') console.log('PA', this.tableData.sort((a, b) => parseFloat(a.prix) - parseFloat(b.prix)));
    else if(this.isDescSorting(column) && column === 'prix') console.log('PD', this.tableData.sort((a, b) => parseFloat(b.prix) - parseFloat(a.prix)));
    else if(this.isAscSorting(column) && column === 'designation') console.log('DA', this.tableData.sort((a, b) => a.designation < b.designation ? -1 : 1));
    else if(this.isDescSorting(column) && column === 'designation') console.log('DD', this.tableData.sort((a, b) => a.designation > b.designation ? -1 : 1));
    else if(this.isAscSorting(column) && column === 'jour') console.log('JA', this.tableData.sort((a, b) => a.jour < b.jour ? -1 : 1));
    else if(this.isDescSorting(column) && column === 'jour') console.log('JD', this.tableData.sort((a, b) => a.jour > b.jour ? -1 : 1));
    this.sorting = {
      column,
      order: futureSortignOrder
    }
  }

  onClickModification(data:any){
    this.newItemEvent.emit({id:parseInt(data.target.attributes.id.value), str:'modification'});
  }
  onClickDelete(data:any){
    this.newItemEvent.emit({id:parseInt(data.target.attributes.id.value), str:'delete'});
  }
}



export interface SortingInterface {
  column: string;
  order: 'asc' | 'desc';
}

