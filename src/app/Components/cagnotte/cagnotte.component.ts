import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cagnotte',
  templateUrl: './cagnotte.component.html',
  styleUrl: './cagnotte.component.css'
})
export class CagnotteComponent {

  @Input() wallet!:string;
}
