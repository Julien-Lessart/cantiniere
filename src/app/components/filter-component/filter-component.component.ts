import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrl: './filter-component.component.css',
})
export class FilterComponentComponent {
  @Input() filteredOptions: { data: any; name: string }[] = [
    { data: new Date().getDay(), name: '' },
  ];

  filteredOption?: number = new Date().getDay();
  /*
  ngOnInit(): void {
    this.filteredOption = this.filteredOptions[0].data;
  }
  */

  setValue(filter: number) {
    console.log(new Date().getDay());
    this.filteredOption = filter;
    console.log(this.filteredOption);
  }
}
