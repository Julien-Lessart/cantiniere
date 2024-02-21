import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrl: './filter-component.component.css',
})
export class FilterComponentComponent implements OnInit {
  @Input() filteredOptions: string[] = [''];

  filteredOption: string = '';
  ngOnInit(): void {
    this.filteredOption = this.filteredOptions[0];
  }

  setValue(filter: string) {
    console.log(this.filteredOption);
    this.filteredOption = filter;
    console.log(this.filteredOption);
  }
}
