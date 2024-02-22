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

import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import {SortDirective, SortEvent, compare } from '../../directives/sort/sort.directive';
import { table} from '../../models/table.model';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{

  @Input() tableHeader!:table;
  @Input() tableData!:Array<table>;
  tableDataCompare!:Array<table>;
  i:number = 0;
  
  // Permet de voir les changement effectuer sur le tableau
  @ViewChildren(SortDirective)
  headers!:QueryList<SortDirective>;
  
  ngOnInit(){
    // Pour pas avoir un tableau vide
    this.tableDataCompare = [...this.tableData];
  }


  // TO DO les données ne sont pas afficher dans le bon ordre
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting data
    if (direction === '' || column === '') {
      this.tableData = this.tableDataCompare;
    } else {
      this.tableData = [...this.tableDataCompare].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}

