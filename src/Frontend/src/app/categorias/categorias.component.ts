import { Component } from '@angular/core';
import { slideToSideFromRight, slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  animations: [slideToSide, slideToSideFromRight]
})
export class CategoriasComponent {

}
